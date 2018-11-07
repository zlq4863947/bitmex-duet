const ti = require("technicalindicators");

export interface IchimokuInput {
  high: number[],
  low: number[],
  conversionPeriod?: number,
  basePeriod?: number,
  spanPeriod?: number,
  displacement?: number,
}

export interface IchimokuOutput {
  conversion: number,
  base: number,
  spanA: number,
  spanB: number,
}

export function ichimoku(input: IchimokuInput): IchimokuOutput[] {
  return ti.IchimokuCloud.calculate({
    high: input.high,
    low: input.low,
    conversionPeriod: input.conversionPeriod ? input.conversionPeriod : 9,
    basePeriod: input.basePeriod ? input.basePeriod : 26,
    spanPeriod: input.spanPeriod ? input.spanPeriod : 52,
    displacement: input.displacement ? input.displacement : 26,
  });
}

export interface SmaInput {
  values: number[],
  period?: number,
}

export function sma(input: SmaInput): number[] {
  return ti.SMA.calculate({
    period: input.period ? input.period : 10,
    values: input.values
  });
}