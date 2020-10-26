const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { shortUrl } = ctx.params;
    const res = await ctx.service.url.findUrl(shortUrl);
    if (res) {
      this.ctx.redirect(`https://${res.longUrl}`);
    }
    ctx.body = res;
  }

  async homePage() {
    this.ctx.body = {
      res: 2,
    };
  }
}
module.exports = HomeController;
