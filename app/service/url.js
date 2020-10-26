const { Service } = require('egg');

class Url extends Service {
  async findUrl(shortUrl) {
    const res = await this.ctx.model.Url.findOne({
      where: {
        shortUrl,
      },
    });
    return res;
  }

  async findOrCreate(longUrl) {
    const uid = this.ctx.state.user.id;
    const res = await this.ctx.model.Url.findOrCreate({
      where: {
        longUrl,
        uid,
      },
    });
    return res;
  }

  async updateShortUrl(id, idTo64) {
    const res = await this.ctx.model.Url.update(
      { shortUrl: idTo64 },
      {
        where: {
          id,
        },
      },
    );
    return res;
  }

  async getAndCount(pageIndex = 0, pageSize = 10) {
    const uid = this.ctx.state.user.id;
    const res = await this.ctx.model.Url.findAndCountAll({
      where: {
        uid,
      },
      limit: pageSize,
      offset: pageIndex * pageSize,
      // offset: (pageIndex > 0 ? (pageIndex - 1) : pageIndex) * pageSize,
    });
    if (res) return res;
    return false;
  }

  async delete(id) {
    const res = await this.ctx.model.Url.destroy({
      where: {
        id,
      },
    });
    return res;
  }
}

module.exports = Url;
