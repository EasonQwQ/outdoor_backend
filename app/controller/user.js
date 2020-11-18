const { Controller } = require('egg');

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    // post请求传来的参数
    const { code } = ctx.request.body;
    // 判断数据库里面是否存在该用户
    const user = await ctx.service.user.login(code);
    if (user) {
      // 用户存在,生成token
      const token = app.jwt.sign({
        user,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
      }, app.config.jwt.secret);
      console.log('UserController -> login -> Mat60 * 72)', Math.floor(Date.now() / 1000) + (60 * 60 * 72));
      ctx.helper.success({ ctx, code: 200, res: token });
    } else {
      ctx.helper.fail({ ctx, code: 500, res: '服务器获取token失败' });
    }
  }

  async get() {
    const { ctx } = this;
    const { user } = ctx.state;
    if (user) {
      this.ctx.helper.success({ ctx, code: 200, res: user });
    } else {
      ctx.helper.fail({ ctx, code: 500, res: '获取用户失败' });
    }
  }

  async loginByPassword() {
    // const { code } = ctx.request.body;
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getByUsernameAndPassword(username, password);
    if (user) {
      // 用户存在,生成token
      const token = app.jwt.sign({
        user,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
      }, app.config.jwt.secret);
      ctx.helper.success({ ctx, code: 1, res: token });
    } else {
      ctx.helper.success({ ctx, code: 0, res: null });
    }
  }
}

module.exports = UserController;
