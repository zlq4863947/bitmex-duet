const BitMEXClient = require('bitmex-realtime-api');
import * as types from '../../type';
import { PublicEndPoints, PrivateEndPoints } from './endpoints';

const config = require('config');

interface IOptions {
  testnet: boolean;
  apiKeyID?: string;
  apiKeySecret?: string;
  maxTableLen: number;
}

export class Socket {
  private mode: 'test' | 'real';
  private options: IOptions;
  private client: any;
  constructor(test?: boolean) {
    this.mode = config.exchange.mode;
    if (test) {
      this.mode = 'test';
    }
    if (this.mode === 'real') {
      this.options = {
        testnet: false,
        apiKeyID: config.exchange.real.apiKey,
        apiKeySecret: config.exchange.real.secret,
        maxTableLen: 10000,
      };
    } else {
      this.options = {
        testnet: true,
        apiKeyID: config.exchange.test.apiKey,
        apiKeySecret: config.exchange.test.secret,
        maxTableLen: 10000,
      };
    }
    try {
      this.client = new BitMEXClient(this.options);
    } catch(e) {
      console.log('ws init error:', e)
    }
  }

  async init() {
    this.client = new BitMEXClient(this.options);
    return new Promise((resolve, reject) => {
      this.client.on('initialize', () => resolve());
    })
  }

  onTradeBin1m(symbol: string, callbock: (orderbook10List: any) => void) {
    this.client.addStream(symbol, PublicEndPoints.TradeBin1m, (data: types.OrderBookL2[], sym: string, tableName: string) => {
      if (data.length > 0) {
        callbock(data);
      }
    });
  }

  onOrderBook10(symbol: string, callbock: (orderbook10List: types.OrderBook10) => void) {
    this.client.on('initialize', () => {
      this.client.addStream(symbol, PublicEndPoints.OrderBook10, (data: types.OrderBook10[], sym: string, tableName: string) => {
        if (data.length > 0) {
          callbock(data[0]);
        }
      });
    });
  }

  onOrderBookL2(symbol: string, callbock: (orderbookL2List: types.OrderBookL2[]) => void) {
    this.client.addStream(symbol, PublicEndPoints.OrderBookL2, (data: types.OrderBookL2[], sym: string, tableName: string) => {
      if (data.length > 0) {
        callbock(data);
      }
    });
  }

  // PrivateEndPoints
  onOrder(symbol: string, callbock: (data: types.Order) => void) {
    //this.client.on('initialize', () => {// types.Order[]
      this.client.addStream(symbol, PrivateEndPoints.Order, (data: any, sym: string, tableName: string) => {
        if (data.length > 0) {
          callbock(data[data.length - 1]);
        }
      });
    //});
  }

  onQuote(symbol: string, callbock: (data: types.Quote) => void) {
    this.client.addStream(symbol, PublicEndPoints.Quote, (data: types.Quote[], sym: string, tableName: string) => {
      if (data.length > 0) {
        callbock(data[0]);
      }
    });
  }

  onExecution(symbol: string, callbock: (data: types.Execution) => void) {
    this.client.on('initialize', () => {
      this.client.addStream(symbol, PrivateEndPoints.Execution, (data: types.Execution[], sym: string, tableName: string) => {
        if (data.length > 0) {
          callbock(data[data.length - 1]);
        }
      });
    });
  }

  getData(symbol: string, endpoint: PublicEndPoints | PrivateEndPoints): { [attr: string]: any } | undefined {
    if (!this.client || !this.client._data || !this.client._data[endpoint] || !this.client._data[endpoint][symbol]) {
      return;
    }
    return this.client.getData(symbol, endpoint);
  }
}
