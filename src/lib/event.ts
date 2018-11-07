import { EventEmitter } from 'events';
import * as types from './type';

export class Event extends EventEmitter {
  orderbook10 = 'orderbook10';
  order = 'order';
  execution = 'execution';

  constructor() {
    super();
  }

  emitOrderbook10(orderbooks: types.OrderBook10) {
    this.emit(this.orderbook10, orderbooks);
  }

  emitOrder(order: types.Order) {
    this.emit(this.order, order);
  }

  emitExecution(execution: types.Execution) {
    this.emit(this.execution, execution);
  }
}
