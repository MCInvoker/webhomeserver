'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
    async login () {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        // ctx.body = {
        //     success: true,
        //     data: {
        //         username,
        //         password,
        //     },
        // };
        const user = await ctx.model.User.findOne({
            where: {
                username,
                password,
            },
        });

        if (user) {
            // const token = ctx.app.jwt.sign({ username }, ctx.app.config.jwt.secret);
            // // 将 Token 存储到 Redis，并设置过期时间
            // await ctx.app.redis.set(`token:${username}`, token, 'EX', 60 * 60 * 24 * 365); // 例如，设置 24 小时过期

            // ctx.body = {
            //     token,
            // };
        } else {
            ctx.status = 401;
            ctx.body = { message: '用户名或密码错误' };
        }

        // if (user == null) return null
        // return user.dataValues
        // const { link_name, url, description = '' } = ctx.request.body;
        // const link = await ctx.model.Link.create({ link_name, category_id, url, description });
        // // 返回插入结果
        // ctx.body = {
        //     success: true,
        //     data: link,
        // };
    }
}

module.exports = UserController;
