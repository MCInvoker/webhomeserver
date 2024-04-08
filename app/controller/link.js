"use strict";
import { check403 } from "../utils/errorMessage";

const { Controller } = require("egg");

class LinkController extends Controller {
  async createLink() {
    const { ctx } = this;
    const { category_id } = ctx.params;
    // // 定义参数校验规则
    // const rule = {
    //     link_name: { type: 'string', required: true },
    //     description: { type: 'string', required: true },
    //     // 其他参数...
    // };
    // // 进行参数校验
    // ctx.validate(rule, ctx.request.body);
    const { link_name, url, description = "" } = ctx.request.body;
    const link = await ctx.model.Link.create({
      created_by: ctx.user.user_id,
      link_name,
      category_id,
      url,
      description,
    });
    // 返回插入结果
    ctx.body = {
      success: true,
      data: link,
    };
  }
  async deleteLink() {
    const { ctx } = this;
    const { link_id } = ctx.params;
    const link = await ctx.model.Link.findByPk(link_id);
    if (!link) {
      ctx.status = 404;
      ctx.body = { error: "link not found" };
      return;
    }
    if (!check403(ctx, link.created_by)) {
        return
    }
    await link.update({ is_deleted: 1 });
    ctx.body = {
      success: true,
      data: link,
    };
  }
  async updateLink() {
    const { ctx } = this;
    const { link_id } = ctx.params;
    const { link_name, category_id, url, description = "" } = ctx.request.body;
    const link = await ctx.model.Link.findByPk(link_id);
    if (!link) {
      ctx.status = 404;
      ctx.body = { error: "link not found" };
      return;
    }
    if (!check403(ctx, link.created_by)) {
        return
    }
    await link.update({ link_name, category_id, url, description });
    ctx.body = {
      success: true,
      data: link,
    };
  }
}

module.exports = LinkController;
