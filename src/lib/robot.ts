import { logger, Helper, Scheduler } from './common';
import { Trader } from './trader';
import { IchimokuInput, ichimoku, SmaInput, sma } from './indicator';
import { Event } from './event';
import * as types from './type';

const config = require('config');

export interface IStatus {
  symbol: string;
  resolution: number;
  amount: number;
  leverage: number;
  side: types.OrderSide;
  inverseSide: types.OrderSide;
  isInitSell: boolean;
  isOrder: boolean;
  // 当前步骤
  step: types.Step;
}

export interface RuleOutput {
  action?: types.OrderSide;
  close: number;
}

export class Robot {
  status: IStatus;
  event: Event;
  // 交易者
  trader: Trader;

  constructor() {
    this.status = {
      symbol: config.app.symbol,
      amount: config.app.amount,
      side: config.app.side,
      leverage: config.app.leverage,
      resolution: config.app.resolution,
      inverseSide: config.app.side === types.OrderSide.Sell ? types.OrderSide.Buy : types.OrderSide.Sell,
      isInitSell: config.app.side === types.OrderSide.Sell,
      isOrder: config.app.isOrder ? true : false,
      step: types.Step.Order1,
    };
    this.event = new Event();
    this.trader = new Trader(this.status.symbol, this.event);
  }

  async start() {
    logger.info(`启动机器人`);
    await this.trader.updateLeverage(this.status.symbol, this.status.leverage);
    Scheduler.min(this.status.resolution, async () => {
      try {
        logger.info(`执行${this.status.resolution}分钟定时任务。。。。`);
        logger.info(`系统状态: ${JSON.stringify(this.status)}`);
        const res = await this.rule();
        if (res.action) {
          await this.doOrder(res.action, res.close);
        }
      } catch(err) {
        logger.error(`定时任务[异常终了] ${err.message}`);
      }
    });
  }

  async doOrder(action: types.OrderSide, price: number) {
    logger.info(`执行订单${this.status.step}[启动]`);

    try {
      const timer = Helper.getTimer();
      // 买入/卖出动作 == 本次动作
      if (this.getOrderSide(this.status.step) === action) {
        // this.status.step === types.Step.Order1
        const input = {
          symbol: this.status.symbol,
          side: action,
          price, 
          amount: this.status.amount,
        }
        logger.info(`订单信息: ${JSON.stringify(input)}`);
        if (this.status.isOrder) {
          const orderInfo = await this.trader.order(input);
          if (!orderInfo) {
            throw Error(`订单${this.status.step}下单异常 - 执行返回结果为空`);
          }
          if (orderInfo.error) {
            if (orderInfo.error.message.includes('insufficient Available Balance')) {
              throw Error(`订单${this.status.step}下单异常 - 账户余额不足，取消下单。${orderInfo.error.message}`);
            } else if (orderInfo.error.message.includes('overloaded')) {
              throw Error(`订单${this.status.step}下单异常 - 系统过载。${orderInfo.error.message}`);
            } else {
              throw Error(`订单${this.status.step}下单异常 - 未知错误。${orderInfo.error.message}`);
            }
          }
          if (orderInfo.ordStatus === types.OrderStatus.Canceled || orderInfo.ordStatus === types.OrderStatus.Rejected) {
            throw Error(`订单${this.status.step}被${orderInfo.ordStatus === types.OrderStatus.Canceled ? '取消' : '拒绝'}`);
          }
        }
        logger.info(`执行订单${this.status.step}[终了] ${Helper.endTimer(timer)}`);
        this.status.step = this.status.step === types.Step.Order1 ? types.Step.Order2 : types.Step.Order1;
      } else {
        logger.info(`执行订单${this.status.step}不满足执行[终了] ${Helper.endTimer(timer)}`);
      }
    } catch(err) {
      logger.error(`执行订单[异常终了] ${err.message}`);
    }
  }

  async rule(): Promise<RuleOutput>{
    const bars = await this.trader.getBars(this.status.symbol, this.status.resolution);
    const ichimokuRes = ichimoku({
      high: bars.h,
      low: bars.l,
    });
    const smaRes = sma({
      values: bars.c
    });
    if (bars.c.length === 0 || ichimokuRes.length === 0 || smaRes.length === 0) {
      logger.error(`获取指标数据出错：bars.c: ${bars.c}, ichimokuRes: ${ichimokuRes}, smaRes: ${smaRes}`)
    }
    const lastClose = bars.c[bars.c.length-1];
    if (!lastClose) {
      logger.info(`最近k线为空，取消检测。`)
      return {action: undefined, close: 0};
    }
    const baseline = ichimokuRes[ichimokuRes.length - 1].base;
    const ma = smaRes[smaRes.length-1];
    let action;
    // 买入
    if (lastClose > baseline && lastClose > ma) {
      logger.info(`收盘价(${lastClose}) > 基准线数值(${baseline}),并且 收盘价(${lastClose}) > 均线数值(${ma})，买入操作`);
      action = types.OrderSide.Buy;
    } 
    // 卖出
    else if (lastClose < baseline && lastClose < ma) {
      logger.info(`收盘价(${lastClose}) < 基准线数值(${baseline}),并且 收盘价(${lastClose}) < 均线数值(${ma})，卖出操作`);
      action = types.OrderSide.Sell;
    } else {
      logger.info(`交易规则计算未满足买入、卖出条件，待机`);
    }
    return {
      action,
      close: lastClose
    };
  }

  // 获取相应步骤的买入/卖出操作
  private getOrderSide(step: types.Step): types.OrderSide {
    return step === types.Step.Order1 ? this.status.side : this.status.inverseSide;
  }
}