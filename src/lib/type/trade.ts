export enum OrderSide {
  Buy = 'Buy',
  Sell = 'Sell',
}

export interface IOrder {
  symbol: string;
  side: OrderSide;
  price: number;
  amount: number;
}

export enum OrderStatus {
  New = 'New',
  Filled = 'Filled',
  Rejected = 'Rejected',
  PartiallyFilled = 'PartiallyFilled',
  Canceled = 'Canceled',
}

export enum Step {
  // Init,
  Order1 = 1,
  Order2 = 2,
}
