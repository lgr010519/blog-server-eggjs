/* eslint valid-jsdoc: "off" */

'use strict';

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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    news: {
      limit: 5,
      serverUrl: 'https://cnodejs.org/api/v1/topics',
    }
  };

  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // csrf安全
  config.security = {
    csrf: false
  };

  // 上传文件
  config.multipart = {
    mode: 'file',
    fileExtensions: ['.md'], // 增加对 md 扩展名的文件支持
  };

  config.session = {
    key: 'BLOG_EGG_SESSION_KEY',
    encrypt: false
  }

  return {
    ...config,
    ...userConfig,
  };
};
