import * as assert from 'power-assert';
import * as types from '../src/lib/type';
import { Rest } from '../src/lib/api/rest';

const rest = new Rest();
const symbol = 'XBTUSD';

const testGetCandlestick = async () => {

  for (let index = 0; index < 301; index++) {
    console.log(`-----------------------------------${index}-----------------------------------`)
    const input: types.CandlestickInput = {
      symbol,
      resolution: 60,
      from: 1540906878,
      to: 1541511738
    };
    
    const res = await rest.getCandlestick(symbol, 60);
    console.log(JSON.stringify(res));
    
  }
  const input: types.CandlestickInput = {
    symbol,
    resolution: 60,
    from: 1540906878,
    to: 1541511738
  };
  
  const res = await rest.getCandlestick(symbol, 60);
  console.log(JSON.stringify(res));
  //assert(res.ratelimit.limit === 300);
  //assert(res.orderBooks.length > 0);
};

describe('Rest-API测试', () => {
  it('查询K线', testGetCandlestick);
});
