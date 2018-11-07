module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // 定时维护
    {
      name: 'duet',
      script: 'runner.js',
      exec_mode: 'cluster_mode',
      cron_restart: '0 1 * * *',
    }
  ],
};
