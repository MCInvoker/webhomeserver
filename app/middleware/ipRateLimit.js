// app/middleware/ipRateLimit.js
module.exports = app => {
    return async function ipRateLimitMiddleware(ctx, next) {
      const { app, ip, path } = ctx;
      const redisKey = `ip:${ip}:${path}`; // 使用路径作为 Redis 键的一部分，以实现接口隔离
      const limitPeriod = 60 * 60; // 1小时
      const maxRequestsPerHour = getMaxRequestsPerHour(path); // 根据接口路径获取每小时最大请求数
  
      try {
        const data = await app.redis.get(redisKey);
  
        if (!data) {
          // 如果 IP 的记录不存在，创建一个新的记录
          await app.redis.set(redisKey, JSON.stringify([{ timestamp: Date.now(), count: 1 }], 'EX', limitPeriod));
        } else {
          // 如果 IP 的记录已存在，检查请求频率
          const requests = JSON.parse(data);
          const now = Date.now();
          const filteredRequests = requests.filter(request => now - request.timestamp < limitPeriod * 1000);
          const totalRequests = filteredRequests.reduce((acc, cur) => acc + cur.count, 0);
  
          if (totalRequests > maxRequestsPerHour) {
            ctx.status = 429; // 请求过多
            ctx.body = '来自该 IP 的请求过多，请稍后再试。';
            return;
          }
  
          // 更新请求记录
          filteredRequests.push({ timestamp: now, count: 1 });
          await app.redis.set(redisKey, JSON.stringify(filteredRequests), 'EX', limitPeriod);
        }
      } catch (err) {
        console.error('Error accessing Redis:', err);
      }
  
      await next();
    };
};

// 根据接口路径获取每小时最大请求数的函数，示例
function getMaxRequestsPerHour(path) {
    // 根据实际需求返回不同接口的最大请求数
    // if (path === '/api/foo') {
    //     return 5;
    // } else if (path === '/api/bar') {
    //     return 20;
    // }
    return 10; // 默认值
}
