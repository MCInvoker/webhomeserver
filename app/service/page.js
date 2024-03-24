// app/service/user.js
const { Service } = require("egg");

class PageService extends Service {
  async createPage(params) {
    const { ctx } = this;
    const { page_name, description = "" } = params;
    const user_id = ctx.user.user_id;
    const page = await ctx.model.Page.create({
      created_by: user_id,
      page_name,
      description,
    });
    // 返回插入结果
    ctx.body = {
      success: true,
      data: page,
    };
  }
}

module.exports = PageService;
