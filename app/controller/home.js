"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = "hi, egg";
  }
  async getConfig() {
    const { ctx, app } = this;
    ctx.body = "config";
  }
}

module.exports = HomeController;
