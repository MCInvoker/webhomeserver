// 将token中的用户信息挂载在ctx中
module.exports = (options, app) => {
    return async function userMiddleware(ctx, next) {
        console.log('==123123')
        try {
            const { headers } = ctx.request;
          const {app} = ctx
          const token = headers.authorization;
        // 验证 Token 的有效性
        const decoded = app.jwt.verify(token.split(' ')[1], app.config.jwt.secret);
        // 将解析出的用户信息挂载到 ctx 中，以便后续中间件和控制器使用
        ctx.user = decoded;
        await next();
      } catch (err) {
        await next();
      }
    };
};