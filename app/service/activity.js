const { Service } = require('egg');

class Activity extends Service {
  async findAllAndCount() {
    const { ctx } = this;
    const res = await ctx.model.Activity.findAndCountAll();
    return res;
  }
}

module.exports = Activity;
