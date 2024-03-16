"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = "hi, egg";
  }
  async getConfig() {
    const { ctx, app } = this;
    const password = "qj759302142";
    const hashedPassword = await ctx.genHash(password);
    console.log("------", hashedPassword);
    console.log("ctx", ctx);
    console.log("app1", ctx.app);
    console.log("app2", app);
    console.log("cache", ctx.app.cache);
    ctx.body = "config";
  }
}

module.exports = HomeController;
