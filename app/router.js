'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/config', controller.home.getConfig);
    router.post('/api/link', controller.link.createLink);
    router.delete('/api/link/:link_id', controller.link.deleteLink);
    router.get('/api/page/:page_id', controller.page.getPage);
};
