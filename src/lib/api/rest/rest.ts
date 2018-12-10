import fetch, { Headers, RequestInit } from 'node-fetch';
import * as types from '../../type';
import { logger } from '../../common';
import { Endpoints } from './endpoints';
const crypto = require('crypto');

const qs = require('qs');
const config = require('config');

export interface RestResponse {
  headers: Headers;
  body: { [attr: string]: any };
}

export interface IRest {
  test?: boolean;
  credential?: types.ICredential;
}

/**
 * https://www.bitmex.com/app/restAPI
 */
export class Rest {
  private mode: 'test' | 'real';
  private urls = {
    test: 'https://testnet.bitmex.com',
    api: 'https://www.bitmex.com',
  };
  private baseUrl: string;
  private apiRoot = '/api/v1/';
  private credential: types.ICredential;

  constructor(input?: IRest) {
    this.mode = config.exchange.mode;
    if (input && input.test) {
      this.mode = 'test';
    }
    if (this.mode === 'real') {
      this.baseUrl = this.urls.api;
      this.credential = {
        apiKey: config.exchange.real.apiKey,
        secret: config.exchange.real.secret,
      };
    } else {
      logger.info('测试模式下运行返佣程序');
      this.baseUrl = this.urls.test;
      this.credential = {
        apiKey: config.exchange.test.apiKey,
        secret: config.exchange.test.secret,
      };
    }

    if (input && input.credential) {
      this.credential = input.credential;
    }
  }

  /**
   * 获取请求的签名，计算方法为 hex(HMAC_SHA256(apiSecret, verb + path + nonce + data))
   */
  getSignature(apiSecret: string, content: string) {
    return crypto
      .createHmac('sha256', apiSecret)
      .update(content)
      .digest('hex');
  }

  async request(method: types.HttpMothed, endpoint: string, data: { [attr: string]: any }): Promise<RestResponse> {
    let query = '',
      postBody = '';
    if (method === types.HttpMothed.GET) {
      query = Object.keys(data).length !== 0 ? '?' + qs.stringify(data) : '';
    } else {
      postBody = JSON.stringify(data);
    }
    // 1分钟过期时间
    const expires = Math.round(Date.now() / 1000) + 60;
    // 签名内容（verb + path + nonce + data）
    const signContent = method + this.apiRoot + endpoint + query + expires + postBody;
    // 请求的签名
    const signature = this.getSignature(this.credential.secret, signContent);

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'api-expires': String(expires),
        'api-key': this.credential.apiKey,
        'api-signature': signature,
      },
    };
    if (method !== types.HttpMothed.GET) {
      options.body = postBody;
    }

    const url = this.baseUrl + this.apiRoot + endpoint + query;
    const reponse = await fetch(url, options);
    const json = await reponse.json();
    return {
      headers: reponse.headers,
      body: json,
    };
  }

  private getRateLimit(headers: Headers) {
    const rateLimit: types.IRateLimit = {
      remaining: Number(headers.get('x-ratelimit-remaining')),
      reset: Number(headers.get('x-ratelimit-reset')),
      limit: Number(headers.get('x-ratelimit-limit')),
    };
    return rateLimit;
  }

  /**
   * const res: any[] = await rest.getPosition({
   *   filter: { symbol: 'XBTUSD' },
   *   columns: ['currentQty', 'avgEntryPrice'],
   * });
   * @param data
   */
  async getPosition(data: { [attr: string]: any }): Promise<{ ratelimit: types.IRateLimit; positions: types.Position[] }> {
    const res = await this.request(types.HttpMothed.GET, Endpoints.Position, data);
    return {
      ratelimit: this.getRateLimit(res.headers),
      positions: <types.Position[]>res.body,
    };
  }

  async getOrder(data: { [attr: string]: any }): Promise<{ ratelimit: types.IRateLimit; orders: types.Order[] }> {
    const res = await this.request(types.HttpMothed.GET, Endpoints.Order, data);
    return {
      ratelimit: this.getRateLimit(res.headers),
      orders: <types.Order[]>res.body,
    };
  }

  async newOrder(data: { [attr: string]: any }): Promise<{ ratelimit: types.IRateLimit; order: types.Order }> {
    const res = await this.request(types.HttpMothed.POST, Endpoints.Order, data);
    return {
      ratelimit: this.getRateLimit(res.headers),
      order: <types.Order>res.body,
    };
  }

  async updOrder(data: { [attr: string]: any }): Promise<{ ratelimit: types.IRateLimit; order: types.Order }> {
    const res = await this.request(types.HttpMothed.PUT, Endpoints.Order, data);
    return {
      ratelimit: this.getRateLimit(res.headers),
      order: <types.Order>res.body,
    };
  }

  async delOrder(data: { [attr: string]: any }): Promise<{ ratelimit: types.IRateLimit; orders: types.Order[] }> {
    const res = await this.request(types.HttpMothed.DELETE, Endpoints.Order, data);
    return {
      ratelimit: this.getRateLimit(res.headers),
      orders: <types.Order[]>res.body,
    };
  }

  async updateLeverage(data: { [attr: string]: any }): Promise<{ ratelimit: types.IRateLimit; order: types.Order }> {
    const res = await this.request(types.HttpMothed.POST, Endpoints.PositionLeverage, data);
    return {
      ratelimit: this.getRateLimit(res.headers),
      order: <types.Order>res.body,
    };
  }

  async getOrderBook(data: { [attr: string]: any }): Promise<{ ratelimit: types.IRateLimit; orderBooks: types.OrderBookL2[] }> {
    const res = await this.request(types.HttpMothed.GET, Endpoints.OrderBookL2, data);
    return {
      ratelimit: this.getRateLimit(res.headers),
      orderBooks: <types.OrderBookL2[]>res.body,
    };
  }

  async getCandlestick(symbol: string, resolution: number, from?: number, to?: number): Promise<types.UdfResponse> {
    const end = to ? to : Math.floor(Date.now()/1000);
    const start = from ? from : end - resolution*60*60;
    const input: types.CandlestickInput = {
      symbol, resolution, 
      from: start,
      to: end
    };
    const query = Object.keys(input).length !== 0 ? '?' + qs.stringify(input) : '';
    // 1分钟过期时间
    const expires = Math.round(Date.now() / 1000) + 60;
    const method = types.HttpMothed.GET;
    // 签名内容（verb + path + nonce + input）
    const signContent = method + '/api/udf/history' + query + expires;
    // 请求的签名
    const signature = this.getSignature(this.credential.secret, signContent);

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'api-expires': String(expires),
        'api-key': this.credential.apiKey,
        'api-signature': signature,
      },
    };

    const url = this.baseUrl + '/api/udf/history' + query;
    const reponse = await fetch(url, options);
    const json = await reponse.json();
    return json;
  }
}
