import * as assert from 'power-assert';
import { Robot } from '../src/lib/robot';
import * as types from '../src/lib/type';

const robot = new Robot();

const testRobot = async () => {
  robot.start();
};

describe('程序测试', () => {
  it('测试订单薄事件', testRobot);
});
