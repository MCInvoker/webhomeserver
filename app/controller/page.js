'use strict';

const { Controller } = require('egg');

class PageController extends Controller {
    // 获取某个页面下的所有链接
    async getPage () {
        const { ctx } = this;
        const { page_id } = ctx.params;
        const page = await ctx.model.Page.findByPk(page_id, {
            include: [
                {
                    model: ctx.model.Category,
                    where: { is_deleted: 0 },
                    include: [{
                        model: ctx.model.Link,
                        where: { is_deleted: 0 },
                        separate: true, // separate单独对links独立查询,可能会存在性能问题,如果后期有性能问题可以在其他地方排序
                        order: [['link_id', 'ASC']], // DESC  ASC
                    }],
                },
            ],
        });
        ctx.body = {
            success: true,
            data: page,
        };

    }
    // 获取当前用户下所有页面
    async getPages () {
        const { ctx } = this;
        const pages = await this.ctx.model.Page.findAll({
            where: {
                user_id: '1',
                is_deleted: 0,
            },
        });
        ctx.body = {
            success: true,
            data: pages,
        };
    }
    // 创建页面
    async createPage () {
        const { ctx } = this;
        const { page_name, description = '' } = ctx.request.body;
        const user_id = 1;
        const page = await ctx.model.Page.create({ user_id, page_name, description });
        // 返回插入结果
        ctx.body = {
            success: true,
            data: page,
        };
    }
    //
    async deletePage () {
        const { ctx } = this;
        const { page_id } = ctx.params;
        const page = await ctx.model.Page.findByPk(page_id);
        if (!page) {
            ctx.status = 404;
            ctx.body = { error: 'page not found' };
            return;
        }
        await page.update({ is_deleted: 1 });
        ctx.body = {
            success: true,
            data: page,
        };
    }

    async updatePage () {
        const { ctx } = this;
        const { page_id } = ctx.params;
        const { page_name, description = '' } = ctx.request.body;
        const page = await ctx.model.Page.findByPk(page_id);
        if (!page) {
            ctx.status = 404;
            ctx.body = { error: 'page not found' };
            return;
        }
        await page.update({ page_name, description });
        ctx.body = {
            success: true,
            data: page,
        };
    }

    async getAllPage () {
        const { ctx } = this;
        const { user_id } = ctx.params;

        // 使用 Sequelize 查询获取用户下的所有页面
        const user = await ctx.model.User.findByPk(user_id, {
            include: [{ model: ctx.model.Page, as: 'pages' }],
        });

        ctx.body = {
            success: true,
            data: user.pages,
        };
    }

}

module.exports = PageController;
