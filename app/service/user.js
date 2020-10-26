const { Service } = require('egg');

class User extends Service {
  async login(code) {
    const { ctx } = this;
    // 从config中获取微信appid和secret
    const { weapp } = this.app.config;
    // 用appid和secret从微信服务器获取oppenid
    const openIdFromWeChat = await this.ctx.http.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${weapp.appId}&secret=${weapp.secret}&js_code=${code}&grant_type=authorization_code`,
    );
    const { openid } = openIdFromWeChat;
    if (openid) {
      const user = await ctx.model.User.findOrCreate({
        where: {
          openid,
        },
      });
      if (user) {
        return user;
      }
      return false;
    }
    this.ctx.helper.fail({ ctx, code: 500, res: '从微信获取oppenid失败' });
    return false;
  }

  async echo() {
    const user = await this.ctx.model.User.findAll();
    return user;
    // await this.ctx.model.User.destroy({
    //   where: {
    //     id: 1,
    //   },
    // });
  }

  async getByUsernameAndPassword(username, password) {
    const user = await this.ctx.model.User.findOne({
      where: {
        username, password,
      },
    });
    return user;
  }
}

module.exports = User;
