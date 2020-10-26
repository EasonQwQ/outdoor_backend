const { Controller } = require('egg');

class ActivityController extends Controller {
  async getAllAndCount() {
    const { ctx } = this;
    const res = await ctx.service.activity.findAllAndCount();
    this.ctx.helper.success({ ctx, code: 200, res });
  }
}
module.exports = ActivityController;
