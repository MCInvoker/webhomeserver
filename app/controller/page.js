'use strict';

const { Controller } = require('egg');

class PageController extends Controller {
    async getPage () {
        const { ctx } = this;
        const { page_id } = ctx.params;

        // const page = await ctx.model.Page.findByPk(pageId, {
        //   include: [
        //     { model: ctx.model.Category, include: [{ model: ctx.model.Link }] }
        //   ]
        // });
        const page = await ctx.model.Page.findByPk(page_id, {
            where: { is_deleted: 0 },
            include: [
                // { model: ctx.model.Category, where: { is_deleted: 0 } }
                { model: ctx.model.Category, where: { is_deleted: 0 }, include: [{ model: ctx.model.Link, where: { is_deleted: 0 } }] }
            ]
        });

        ctx.body = {
            success: true,
            data: page,
        };
    }
}

module.exports = PageController;
