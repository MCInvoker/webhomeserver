"use strict";
import { TOKEN_VALIDITY_PERIOD } from "../utils/const";
const { Controller } = require("egg");

class UserController extends Controller {
  async passwordLogin () {
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
          {
            expiresIn: TOKEN_VALIDITY_PERIOD,
          }
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

  async phoneLogin () {
    const { ctx, app } = this;
    const { phone, verification_code } = ctx.request.body;
    const redisCode = await app.redis.get("SMS_465412747" + phone);
    if (verification_code !== redisCode) {
      ctx.body = {
        success: false,
        message: "验证码错误！",
      };
      return;
    }
    const user = await ctx.model.User.findOne({
      where: {
        phone,
      },
    });

    if (user) {
      const token = app.jwt.sign(
        { user_id: user.user_id },
        app.config.jwt.secret,
        { expiresIn: TOKEN_VALIDITY_PERIOD }
      );
      ctx.body = { success: true, message: "登录成功", token };
    } else {
      ctx.body = {
        success: false,
        message: "该手机号暂未注册！",
      };
      return;
    }
  }

  async register () {
    const { ctx, app } = this;
    const { account, password, phone, verification_code } = ctx.request.body;
    const userAccountCheck = await ctx.model.User.findOne({ where: { account } });
    if (userAccountCheck) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: "账号不能重复",
      };
      return;
    }
    const userPhoneCheck = await ctx.model.User.findOne({ where: { phone } });
    if (userPhoneCheck) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: "手机号已经被注册",
      };
      return;
    }
    // 校验密码格式是否合法
    // 校验手机号和验证码是否匹配
    const redisCode = await app.redis.get("SMS_465431543" + phone);
    if (verification_code !== redisCode) {
      ctx.body = {
        success: false,
        message: "验证码错误！",
      };
      return;
    }
    // 使用 bcrypt 加密密码
    const hashedPassword = await ctx.genHash(password);
    const result = await ctx.model.User.create({
      account,
      password: hashedPassword,
      phone,
    });
    // 注册时创建默认页面和默认分类
    const page = await ctx.model.Page.create({
      created_by: result.user_id,
      page_name: "默认页面",
      description: "创建账号时默认创建的页面",
      is_default: 1,
    });
    await ctx.model.Category.create({
      created_by: result.user_id,
      category_name: "默认分类",
      description: "创建账号时默认创建的分类",
      page_id: page.page_id,
      is_default: 1,
    });
    // 返回插入结果
    ctx.body = {
      success: true,
      data: { user_id: result.user_id, page_id: page.page_id },
    };
  }

  // 查询账号是否重复
  async accountCheck () {
    const { ctx } = this;
    const { account } = ctx.params;
    const user = await ctx.model.User.findOne({ where: { account } });
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
  async phoneCheck () {
    const { ctx } = this;
    const { phone } = ctx.params;
    const user = await ctx.model.User.findOne({ where: { phone } });
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
