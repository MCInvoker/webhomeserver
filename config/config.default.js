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
    config.keys = appInfo.name + '_759302142';

    // add your middleware config here
    config.middleware = [];

    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
        domainWhiteList: ['http://localhost:3000'],
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    config.sequelize = {
        dialect: 'mysql', // 数据库类型，这里假设使用 MySQL
        host: 'localhost',
        port: 3306,
        database: 'webhome', // 替换为实际的数据库名
        username: 'root', // 替换为实际的数据库用户名
        password: 'qj759302142', // 替换为实际的数据库密码
    };


    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
