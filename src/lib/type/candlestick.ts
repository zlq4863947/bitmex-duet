export interface CandlestickInput {
  symbol: string;
  resolution: number;
  from: number;
  to: number;
}

export interface UdfResponse {
  s: 'ok' | 'no_data';
	nextTime?: number;
	t: number[];
	c: number[];
	o: number[];
	h: number[];
	l: number[];
	v: number[];
}
