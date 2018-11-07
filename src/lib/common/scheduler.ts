import { Job } from 'node-schedule';

/**
 * @class
 * @classdesc Cron表达式定时器
 *
 * @param {string=}[cron='30 15 * * *'] Cron表达式<br/>
 **    *    *    *    *    *<br/>
 *┬    ┬    ┬    ┬    ┬    ┬<br/>
 *│    │    │    │    │    └ 星期 (0 - 7) (0 or 7 为星期日)<br/>
 *│    │    │    │    └───── 月 (1 - 12)<br/>
 *│    │    │    └────────── 天 (1 - 31)<br/>
 *│    │    └─────────────── 小时 (0 - 23)<br/>
 *│    └──────────────────── 分钟 (0 - 59)<br/>
 *└───────────────────────── 秒 (0 - 59, 可选)
 */
export class Scheduler {

  static min(minute: number,fn: () => {}) {
    const job = new Job(fn);
    job.schedule(`*/${minute} * * * *`);
    return job;
  }

  static min1(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('*/1 * * * *');
    return job;
  }

  static min5(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('*/5 * * * *');
    return job;
  }

  static min10(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('*/10 * * * *');
    return job;
  }

  static min15(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('*/15 * * * *');
    return job;
  }

  static min30(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('*/30 * * * *');
    return job;
  }

  static min60(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('*/60 * * * *');
    return job;
  }

  static min120(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('*/120 * * * *');
    return job;
  }

  static day(fn: () => {}) {
    const job = new Job(fn);
    job.schedule('0 0 * * *');
    return job;
  }
}
