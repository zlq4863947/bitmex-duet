import * as assert from 'power-assert';
import * as types from '../src/lib/type';
import { Socket, PublicEndPoints, Rest } from '../src/lib/api';
import { logger } from '../src/lib/common';

const ws = new Socket();
const symbol = 'XBTUSD';

const testTradeBin1m = (done: () => void) => {
  let called = false;
  ws.onTradeBin1m(symbol, (data) => {
    if (called) return;
    called = true;
    console.log(JSON.stringify(data));
    assert(data.symbol === symbol);
    assert(data.asks.length > 0);
    assert(data.bids.length > 0);
    done();
  });
};

describe('WS-API测试', () => {
  it('测试TradeBin1m', testTradeBin1m);
  after(() => {
    process.exit();
  });
});
