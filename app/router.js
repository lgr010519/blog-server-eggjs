'use strict';

const {baseRouter} = require("../config/config.user");
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller, jwt} = app;
    const baseRouter = app.config.baseRouter; //  /api/v1
    router.post(baseRouter + '/admin/login', controller.admin.adminLogin); // 登录
    router.post(baseRouter + '/admin/logout', controller.admin.adminLogout); // 退出登录
    router.resources('articles', baseRouter + '/articles', controller.articles); // 文章
    router.get(baseRouter + '/articles/:id', controller.articles.getArticleDetail); // 获取文章详情
    router.put(baseRouter + '/articles/addViews/:id', controller.articles.addViews); // 增加查看数
    router.post(baseRouter + '/articles/byTags', controller.articles.getArticlesByTags); // 根据标签获取文章详情
    router.post(baseRouter + '/articles/byCategories', controller.articles.getArticlesByCategories); // 根据分类获取文章详情
    router.post(baseRouter + '/articles/byIds', controller.articles.getArticlesByIds); // 获取用户收藏的文章
    router.put(baseRouter + '/articles/status/:id', jwt, controller.articles.changeStatus); // 修改文章状态
    router.put(baseRouter + '/articles/publishStatus/:id', jwt, controller.articles.changePublishStatus); // 修改发布状态
    router.post(baseRouter + '/articles/collectStatus', jwt, controller.articles.changeCollectStatus); // 一键开启/关闭收藏
    router.resources('tags', baseRouter + '/tags', controller.tags); // 标签
    router.put(baseRouter + '/tags/status/:id', jwt, controller.tags.updateStatus); // 修改标签状态
    router.resources('categories', baseRouter + '/categories', controller.categories); // 分类
    router.resources('about', baseRouter + '/about', jwt, controller.about); // 关于
    router.resources('user', baseRouter + '/user', jwt, controller.user); // 用户
    router.get(baseRouter + '/user/info', jwt, controller.user.getUserInfo); // 用户详情信息
    router.post(baseRouter + '/user/login', controller.user.userLogin); // 用户登录
    router.get(baseRouter + '/user/captcha', controller.user.getCaptcha); // 获取图形验证码
    router.post(baseRouter + '/user/register', controller.user.userRegister); // 用户注册
    router.post(baseRouter + '/user/logout', controller.user.userLogout); // 用户退出登录
    router.get('userNum', baseRouter + '/user/userNum', jwt, controller.user.getUserNum); // 用户数量统计
    router.post(baseRouter + '/user/collect', jwt, controller.user.updateUserCollectNum); // 更新用户收藏文章
    router.resources('comment', baseRouter + '/comment', jwt, controller.comment); // 评论
    router.resources('home', baseRouter + '/config/home', jwt, controller.config.home); // 首页配置
    router.resources('hf', baseRouter + '/config/hf', jwt, controller.config.hf); // Header/Footer配置
    router.resources('right_introduction', baseRouter + '/config/right/introduction', jwt, controller.config.right.introduction); // 个人简介配置
    router.resources('right_ad', baseRouter + '/config/right/ad', jwt, controller.config.right.ad); // 广告设置
    router.resources('right_recommend', baseRouter + '/config/right/recommend', jwt, controller.config.right.recommend); // 推荐设置
};
