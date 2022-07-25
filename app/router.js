'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.post('/file',controller.posts.file)
  router.resources('posts', '/api/posts', controller.posts);
  router.get('/add/cookies', controller.home.add);
};
