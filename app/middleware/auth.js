module.exports = (options, app) => {
  return async function authMiddleware(ctx, next) {
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

      // 将解析出的用户信息挂载到 ctx 中，以便后续中间件和控制器使用 注释，移动到userMiddleware了
      // ctx.user = decoded;

      // todo 如果 Token 快过期，续签 Token
      //   const currentTimestamp = Math.floor(Date.now() / 1000);
      //   const { exp } = decoded;
      //   const tokenExpirationThreshold = 60 * 60 * 24 * 7; // 续签阈值：Token 过期前一个星期
      //   if (exp - currentTimestamp < tokenExpirationThreshold) {
      //     const user = await getUserById(decoded.user_id); // 从数据库或缓存中获取用户信息
      //     // 看user 和user_id是不是符合预期  todo
      //     const newToken = app.jwt.sign(
      //       { userId: user.user_id },
      //       app.config.jwt.secret,
      //       { expiresIn: "30d" }
      //     );

      //     ctx.set("Authorization", `Bearer ${newToken}`); // 将新 Token 返回给客户端
      //   }

      await next();
    } catch (err) {
      console.log(err);
      ctx.status = 401;
      ctx.body = { success: false, message: "Invalid token" };
    }
  };
};
