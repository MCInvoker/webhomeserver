'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middleware } = app;
    const authMiddleware = middleware.auth(app);
    const skipAuthMiddleware = middleware.skipAuth(app);

    router.get('/',app.jwt, controller.home.index);
    router.get('/config', controller.home.getConfig);

    router.post('/api/user/password/login',skipAuthMiddleware, controller.user.passwordLogin);
    router.post('/api/user/phone/login',skipAuthMiddleware, controller.user.phoneLogin);
    router.post('/api/user/register',skipAuthMiddleware, controller.user.register);
    router.post('/api/user/account/check/:account',skipAuthMiddleware, controller.user.accountCheck);
    router.post('/api/user/phone/check/:phone',skipAuthMiddleware, controller.user.phoneCheck);

    router.get('/api/page/:page_id', authMiddleware, controller.page.getPage);
    router.get('/api/page', controller.page.getPages);
    router.post('/api/page', controller.page.createPage);
    router.delete('/api/page/:page_id', controller.page.deletePage);
    router.put('/api/page/:page_id', controller.page.updatePage);

    router.post('/api/category/:page_id', controller.category.createCategory);
    router.delete('/api/category/:category_id', controller.category.deleteCategory);
    router.put('/api/category/:category_id', controller.category.updateCategory);

    router.post('/api/link/:category_id', authMiddleware, controller.link.createLink);
    router.delete('/api/link/:link_id', controller.link.deleteLink);
    router.put('/api/link/:link_id', controller.link.updateLink);
};
