"use strict";

import { generateRandomSixDigitString } from "../utils/util";
const { Controller } = require("egg");

class SmsController extends Controller {
  async sendRegisterVerificationCode() {
    const { ctx, app } = this;
    try {
      const { phone } = ctx.request.body;
      const code = generateRandomSixDigitString();
      await app.redis.set("SMS_465431543" + phone, code, "EX", 60 * 5);
      // await app.redis.get("SMS_465431543" + phone);
      const res = await ctx.sms.sendSMS({
        PhoneNumbers: phone,
        SignName: "webhomeide",
        TemplateCode: "SMS_465431543",
        TemplateParam: `{\"code\":\"${code}\"}`,
      });
      if (res.Code === "OK") {
        ctx.body = {
          success: true,
          message: "已发送短信验证码",
        };
      } else {
        ctx.body = {
          success: false,
          message: "发送短信验证码异常",
        };
        return;
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: "发送短信验证码异常",
      };
      return;
    }
  }
  async sendLoginVerificationCode() {
    const { ctx, app } = this;
    try {
      const { phone } = ctx.request.body;
      const code = generateRandomSixDigitString();
      await app.redis.set("SMS_465412747" + phone, code, "EX", 60 * 5);
      // await app.redis.get("SMS_465412747" + phone); // 获取redis
      const res = await ctx.sms.sendSMS({
        PhoneNumbers: phone,
        SignName: "webhomeide",
        TemplateCode: "SMS_465412747",
        TemplateParam: `{\"code\":\"${code}\"}`,
      });
      if (res.Code === "OK") {
        ctx.body = {
          success: true,
          message: "已发送短信验证码",
        };
      } else {
        ctx.body = {
          success: false,
          message: "发送短信验证码异常",
        };
        return;
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: "发送短信验证码异常",
      };
      return;
    }
  }
}

module.exports = SmsController;
