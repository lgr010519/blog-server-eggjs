/* eslint valid-jsdoc: "off" */

'use strict';

const userConfig = require('./config.user');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1658583789295_3000';

  // add your middleware config here
  config.middleware = [];

  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // csrf安全
  config.security = {
    csrf: false,
  };

  // 上传文件
  config.multipart = {
    mode: 'file',
    fileExtensions: [ '.md' ], // 增加对 md 扩展名的文件支持
  };

  config.session = {
    key: 'BLOG_EGG_SESSION_KEY',
    encrypt: false,
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {},
  };

  config.jwt = {
    secret: userConfig.userName,
  };

  return {
    ...config,
    ...userConfig,
  };
};
