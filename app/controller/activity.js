const { Controller } = require('egg');

class ActivityController extends Controller {
  async getAllAndCount() {
    const { ctx } = this;
    const res = await ctx.service.activity.findAllAndCount();
    this.ctx.helper.success({ ctx, code: 200, res });
  }

  async createActivity() {
    const { ctx } = this;
    const { body } = ctx.request;
    const res = await ctx.service.activity.createActivity(body);
    this.ctx.helper.success({ ctx, code: 200, res });
  }

  async updateActivity() {
    const { ctx } = this;
    const { body: data } = ctx.request;
    const res = await ctx.service.activity.updateActivity(data);
    console.log('ActivityController -> updateActivity -> data', data);
    console.log('ActivityController -> updateActivity -> res', res);

    this.ctx.helper.success({ ctx, code: 200, res });
  }

  async deleteActivity() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.activity.deleteActivity(id);
    if (res) {
      this.ctx.helper.success({ ctx, code: 200, res });
    } else {
      this.ctx.helper.success({ ctx, code: 200, res: { code: 0 } });
    }
  }
}
module.exports = ActivityController;
