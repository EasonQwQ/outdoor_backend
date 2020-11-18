const { Service } = require('egg');

class Activity extends Service {
  async findAllAndCount() {
    const { ctx } = this;
    const res = await ctx.model.Activity.findAndCountAll({
      order: [['id', 'desc']],
    });
    return res;
  }

  async createActivity(data) {
    const res = await this.ctx.model.Activity.create(data);
    return res;
  }

  async updateActivity(data) {
    const res = await this.ctx.model.Activity.update(data, {
      where: {
        id: data.id,
      },
    });
    return res;
  }

  async deleteActivity(id) {
    const res = await this.ctx.model.Activity.destroy({
      where: {
        id,
      },
    });
    return res;
  }
}

module.exports = Activity;
