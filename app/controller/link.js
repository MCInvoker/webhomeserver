'use strict';

const { Controller } = require('egg');

class LinkController extends Controller {
    async createLink () {
        const { ctx } = this;
        const { category_id } = ctx.params;
        const { link_name, url, description = '', } = ctx.request.body;
        const link = await ctx.model.Link.create({ link_name, category_id, url, description });
        // 返回插入结果
        ctx.body = {
            success: true,
            data: link,
        };
    }
    async deleteLink () {
        const { ctx } = this;
        const { link_id } = ctx.params;
        const link = await ctx.model.Link.findByPk(link_id);
        if (!link) {
            ctx.status = 404;
            ctx.body = { error: 'link not found' };
            return;
        }
        await link.update({ is_deleted: 1 });
        ctx.body = {
            success: true,
            data: link,
        };
    }
    async updateLink () {
        const { ctx } = this;
        const { link_id } = ctx.params;
        const { link_name, category_id, url, description = '', } = ctx.request.body;
        const link = await ctx.model.Link.findByPk(link_id);
        if (!link) {
            ctx.status = 404;
            ctx.body = { error: 'link not found' };
            return;
        }
        await link.update({ link_name, category_id, url, description });
        ctx.body = {
            success: true,
            data: link,
        };
    }
}

module.exports = LinkController;
