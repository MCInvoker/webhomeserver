"use strict";

const { Controller } = require("egg");
import { check403 } from "../utils/errorMessage";

class CategoryController extends Controller {
  // 创建分类
  async createCategory() {
    const { ctx } = this;
    const { page_id } = ctx.params;
    const { category_name, description = "" } = ctx.request.body;
    const category = await ctx.model.Category.create({
      created_by: ctx.user.user_id,
      category_name,
      description,
      page_id,
    });
    // 返回插入结果
    ctx.body = {
      success: true,
      data: category,
    };
  }
  //
  async deleteCategory() {
    const { ctx } = this;
    const { category_id } = ctx.params;
    const category = await ctx.model.Category.findByPk(category_id);
    if (!category) {
      ctx.status = 404;
      ctx.body = { error: "category not found" };
      return;
    }
    if (!check403(ctx, category.created_by)) {
        return
    }
    await category.update({ is_deleted: 1 });
    ctx.body = {
      success: true,
      data: category,
    };
  }

  async updateCategory() {
    const { ctx } = this;
    const { category_id } = ctx.params;
    const { category_name, description = "" } = ctx.request.body;
    const category = await ctx.model.Category.findByPk(category_id);
    if (!category) {
      ctx.status = 404;
      ctx.body = { error: "category not found" };
      return;
    }
    if (!check403(ctx, category.created_by)) {
        return
    }
    await category.update({ category_name, description });
    ctx.body = {
      success: true,
      data: category,
    };
  }
}

module.exports = CategoryController;
