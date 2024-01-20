'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/config', controller.home.getConfig);

    router.get('/api/page/:page_id', controller.page.getPage);
    router.get('/api/page', controller.page.getPages);
    router.post('/api/page', controller.page.createPage);
    router.delete('/api/page/:page_id', controller.page.deletePage);
    router.put('/api/page/:page_id', controller.page.updatePage);

    router.post('/api/category/:page_id', controller.category.createCategory);
    router.delete('/api/category/:category_id', controller.category.deleteCategory);
    router.put('/api/category/:category_id', controller.category.updateCategory);

    router.post('/api/link/:category_id', controller.link.createLink);
    router.delete('/api/link/:link_id', controller.link.deleteLink);
    router.put('/api/link/:link_id', controller.link.updateLink);
};
