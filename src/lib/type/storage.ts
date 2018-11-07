import { OrderStatus, OrderSide, Step } from './trade';

/**
 * @废弃
 */
export interface IQueue {
  _id?: string;
  _rev?: string;
  symbol: string;
  step: Step;
  order1?: IQueueOrder;
  order2?: IQueueOrder;
  rebootCount?: number;
  ts?: number;
}

/**
 * @废弃
 */
export interface IQueueOrder {
  orderID: string;
  amount: number;
  price: number;
  side: OrderSide;
  status: OrderStatus;
  isLocked: boolean;
  error?: string;
}

/**
 * 频率限制对象
 */
export interface IRateLimit {
  _id?: string;
  _rev?: string;
  remaining: number;
  reset: number;
  limit: number;
}
