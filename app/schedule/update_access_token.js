const { Subscription } = require('egg');

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '70m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { weapp } = this.app.config;
    const res = await this.ctx.http.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${weapp.appId}&secret=${weapp.secret}`,
    );
    if (res && res.access_token) {
      this.ctx.model.AccessToken.update({ accessToken: res.access_token }, {
        where: {
          id: 1,
        },
      });
    }
    console.log('UpdateCache -> subscribe -> res', res.access_token);
  }
}

module.exports = UpdateCache;
