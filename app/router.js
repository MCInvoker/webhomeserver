"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const authMiddleware = middleware.auth(app);
  // egg init就有的 留着玩
  router.get("/", app.jwt, controller.home.index);
  // 测试用，调试用
  router.get("/config", controller.home.getConfig);

  // 账号密码登录
  router.post("/api/user/password/login", controller.user.passwordLogin);
  // 手机验证码登录
  router.post("/api/user/phone/login", controller.user.phoneLogin);
  // 注册
  router.post("/api/user/register", controller.user.register);
  // 校验账号是否重复
  router.post("/api/user/account/check/:account", controller.user.accountCheck);
  // 校验手机号是否重复
  router.post("/api/user/phone/check/:phone", controller.user.phoneCheck);

  // 用户注册时获取手机验证码
  router.post("/api/sms/register", controller.sms.sendRegisterVerificationCode);
  // 用户登录时获取手机验证码
  router.post("/api/sms/login", controller.sms.sendLoginVerificationCode);

  // 获取某个页面下的所有链接，多层级结构
  router.get("/api/page/:page_id", authMiddleware, controller.page.getPage);
  // router.get('/api/page/:page_id', controller.page.getPage);
  // 获取当前用户下所有页面
  router.get("/api/page", authMiddleware, controller.page.getPages);
  router.post("/api/page", authMiddleware, controller.page.createPage);
  router.delete(
    "/api/page/:page_id",
    authMiddleware,
    controller.page.deletePage
  );
  router.put("/api/page/:page_id", authMiddleware, controller.page.updatePage);

  router.post(
    "/api/category/:page_id",
    authMiddleware,
    controller.category.createCategory
  );
  router.delete(
    "/api/category/:category_id",
    authMiddleware,
    controller.category.deleteCategory
  );
  router.put(
    "/api/category/:category_id",
    authMiddleware,
    controller.category.updateCategory
  );

  router.post(
    "/api/link/:category_id",
    authMiddleware,
    controller.link.createLink
  );
  router.delete(
    "/api/link/:link_id",
    authMiddleware,
    controller.link.deleteLink
  );
  router.put("/api/link/:link_id", authMiddleware, controller.link.updateLink);
};
