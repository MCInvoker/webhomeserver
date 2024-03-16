"use strict";

const { Controller } = require("egg");

class UserController extends Controller {
  async passwordLogin() {
    const { ctx, app } = this;
    const { account, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: {
        account,
      },
    });

    if (user) {
      const passwordMatch = await ctx.compare(password, user.password);
      if (passwordMatch) {
        const token = app.jwt.sign(
          { user_id: user.user_id },
          app.config.jwt.secret,
          { expiresIn: "30d" }
        );
        ctx.body = { success: true, message: "登录成功", token };
      } else {
        ctx.body = { success: false, message: "账号或密码错误！" };
      }
      // // 将 Token 存储到 Redis，并设置过期时间
      // await ctx.redis.set(`token:${account}`, token, 'EX', 60 * 60 * 24 * 365); // 例如，设置 24 小时过期
    } else {
      ctx.status = 401;
      ctx.body = { message: "用户名或密码错误" };
    }
  }

  async phoneLogin() {
    const { ctx, app } = this;
    const { account, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: {
        account,
      },
    });

    if (user) {
      const passwordMatch = await ctx.compare(password, user.password);
      if (passwordMatch) {
        const token = app.jwt.sign(
          { user_id: user.user_id },
          app.config.jwt.secret,
          { expiresIn: "30d" }
        );
        ctx.body = { success: true, message: "登录成功", token };
      } else {
        ctx.body = { success: false, message: "账号或密码错误！" };
      }
    } else {
      ctx.status = 401;
      ctx.body = { message: "用户名或密码错误" };
    }
  }

  async register() {
    const { ctx } = this;
    // todo mysql 新增phone account字段
    const { account, password, phone, verification_code } = ctx.request.body;
    const user = await ctx.model.User.findByPk(account);
    if (user) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: "账号不能重复",
      };
      return;
    }
    // 校验密码格式是否合法
    // 校验手机号和验证码是否匹配
    // 生成随机盐值
    // 使用 bcrypt 加密密码
    const hashedPassword = await ctx.genHash(password);
    // 将用户名、加密后的密码和盐值保存到数据库
    const result = await ctx.model.User.create({
      account,
      password: hashedPassword,
      phone,
    });
    // 返回插入结果
    ctx.body = {
      success: true,
      data: result,
    };
  }

  // 查询账号是否重复
  async accountCheck() {
    const { ctx } = this;
    const { account } = ctx.params;
    const user = await ctx.model.User.findByPk(account);
    if (!user) {
      ctx.body = {
        success: true,
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: "账号重复!",
      };
      return;
    }
  }

  // 查询手机号是否重复
  async phoneCheck() {
    const { ctx } = this;
    const { phone } = ctx.params;
    const user = await ctx.model.User.findByPk(phone);
    if (!user) {
      ctx.body = {
        success: true,
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: "手机号码重复!",
      };
      return;
    }
  }
}

module.exports = UserController;
