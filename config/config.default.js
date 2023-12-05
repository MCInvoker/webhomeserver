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

    config.mysql = {
        client: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'qj759302142',
            database: 'mysql',
        },
        authPlugins: {
            mysql_native_password: 'mysql_native_password',
        },
        app: true,
        agent: false,
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
