'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
    async index () {
        const { ctx } = this;
        console.log('result');
        console.log(ctx.app.mysql);
        const result = await ctx.app.mysql.get('db');
        // const result = await ctx.app.mysql.log();
        console.log(result);
        ctx.body = result;

        // ctx.body = 'hi, egg';
    }
    async getConfig () {
        const { ctx } = this;
        ctx.body = 'config';
    }
}

module.exports = HomeController;
