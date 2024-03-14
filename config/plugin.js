'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    bcrypt:{
        enable: true,
        package: 'egg-bcrypt'
    },
    // redis: {
    //     enable: true,
    //     package: 'egg-redis',
    // },
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },

    // validate: {
    //     enable: true,
    //     package: 'egg-validate',
    // },
    // parameter: {
    //     enable: true,
    //     package: 'egg-parameter',
    // },
};
