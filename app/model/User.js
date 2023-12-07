'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('users', {
        user_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: STRING(255),
        email: STRING(255),
        password: STRING(255),
        // created_at: DATE,
        // updated_at: DATE,
        is_deleted: { type: INTEGER, defaultValue: 0 } // 0 for not deleted, 1 for deleted
    });

    User.associate = function () {
        app.model.User.hasMany(app.model.Page, { foreignKey: 'page_id' });
    };

    return User;
};
