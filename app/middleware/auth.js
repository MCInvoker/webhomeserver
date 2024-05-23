import { TOKEN_VALIDITY_PERIOD } from "../utils/const";

module.exports = (options, app) => {
  return async function authMiddleware (ctx, next) {
    const { headers } = ctx.request;
    const { app } = ctx;
    const token = headers.authorization;

    if (!token) {
      ctx.status = 401;
      ctx.body = { success: false, message: "Authorization token missing" };
      return;
    }

    try {
      // 验证 Token 的有效性
      const decoded = app.jwt.verify(
        token.split(" ")[1],
        app.config.jwt.secret
      );
      // todo 如果 Token 快过期，续签 Token
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const { exp } = decoded;
      const tokenExpirationThreshold = 60 * 60 * 24 * 7; // 续签阈值：Token 过期前一个星期
      if (exp - currentTimestamp < tokenExpirationThreshold) {
        const newToken = app.jwt.sign(
          { user_id: decoded.user_id },
          app.config.jwt.secret,
          { expiresIn: TOKEN_VALIDITY_PERIOD }
        );

        ctx.set("Authorization", newToken); // 将新 Token 返回给客户端
      }

      await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = { success: false, message: "Invalid token" };
    }
  };
};
