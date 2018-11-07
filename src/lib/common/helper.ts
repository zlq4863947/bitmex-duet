import * as types from '../type';

const config = require('config');
const moment = require('moment');
const qs = require('qs');
const excTime = require('execution-time');

let nonceCounter = 0;

export class Helper {
  /**
   * 判断时间是否在2分钟之前
   *
   * @param date "2018-06-15T23:29:04.281Z"
   */
  static isBeforeMin2(date: string) {
    return moment(date).isBefore(moment().add(-2, 'm'));
  }

  static isBeforeSec5(timestamp: string | Date) {
    return moment(timestamp).isAfter(moment().add(-5, 's'));
  }

  /**
   * 输出： "2018-06-22T17:36:38+09:00"
   * @param hour number
   */
  static getBeforeDate(hour: number) {
    return moment()
      .subtract(hour, 'H')
      .format();
  }

  static async delay(s: number) {
    return new Promise((resolve) => setTimeout(resolve, s * 1000));
  }

  static getNowTime() {
    return Math.floor(Date.now() / 1000);
  }

  static getTimer() {
    const timer = excTime();
    timer.start();
    return timer;
  }

  static endTimer(timer: any) {
    return timer.stop().words;
  }

  /**
   * 获取认证凭证信息
   */
  static getCredential() {
    if (config.exchange && config.exchange.apiKey && config.exchange.secret) {
      return <types.ICredential>{
        apiKey: config.exchange.apiKey,
        secret: config.exchange.secret,
      };
    }
  }

  /**
   * 获取ws的认证请求信息
   * @param credential 凭证信息
   */
  static getWSAuthQuery(credential: types.ICredential) {
    // 随机数(0 和 2^53 之间的递增值)
    const nonce = Date.now() * 1000 + (nonceCounter++ % 1000);
    const query = {
      'api-nonce': nonce,
      'api-key': credential.apiKey,
      'api-signature': module.exports(credential.secret, types.HttpMothed.GET, '/realtime', nonce),
    };
    return qs.stringify(query);
  }
}
