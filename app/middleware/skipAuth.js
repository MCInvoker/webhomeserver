module.exports = () => {
    return async function skipAuth(ctx, next) {
      // 在这里添加需要跳过 JWT 校验的接口路径
      const skipPaths = [
        '/api/user/password/login',
        '/api/user/phone/login',
        '/api/user/register',
        '/api/user/account/check',
        '/api/user/phone/check',
    ];
      // 检查当前请求路径是否在跳过路径列表中
      if (skipPaths.includes(ctx.path)) {
        // 如果是跳过路径，则直接进入下一个中间件
        await next();
        return;
      }
      
      // 对于其他请求路径，执行正常的 JWT 验证逻辑
      const token = ctx.header.authorization;
      if (!token) {
        ctx.status = 401;
        ctx.body = { message: 'Authorization token is missing' };
        return;
      }
      
      try {
        // 验证 Token 的有效性
        const {app} = ctx
        const decoded = app.jwt.verify(token.split(' ')[1], app.config.jwt.secret);
  
        // 将解析出的用户信息挂载到 ctx 中，以便后续中间件和控制器使用
        ctx.user = decoded;

        // 如果 Token 快过期，续签 Token
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const { exp } = decoded;
        const tokenExpirationThreshold = 60 * 60 * 24 * 7; // 续签阈值：Token 过期前一个星期
        if (exp - currentTimestamp < tokenExpirationThreshold) {
            const user = await getUserById(decoded.user_id); // 从数据库或缓存中获取用户信息
            // 看user 和user_id是不是符合预期  todo
            const newToken = app.jwt.sign({ userId: user.user_id }, app.config.jwt.secret, { expiresIn: '30d' });

            ctx.set('Authorization', `Bearer ${newToken}`); // 将新 Token 返回给客户端
        }
  
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid authorization token' };
      }
    };
  };
  