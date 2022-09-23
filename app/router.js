'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller, jwt} = app;
    const baseRouter = app.config.baseRouter; //  /api/v1
    router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
    router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);
    router.resources('tags', baseRouter + '/tags', jwt, controller.tags); // 标签
    router.put(baseRouter + '/tags/status/:id', jwt, controller.tags.updateStatus);
};
