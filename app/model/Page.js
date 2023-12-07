'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Page = app.model.define('pages', {
        page_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        user_id: INTEGER,
        page_name: STRING(255),
        description: STRING(255),
        // created_at: DATE,
        // updated_at: DATE,
        is_deleted: { type: INTEGER, defaultValue: 0 }
    });

    Page.associate = function () {
        app.model.Page.belongsTo(app.model.User, { foreignKey: 'user_id' });
        app.model.Page.hasMany(app.model.Category, { foreignKey: 'category_id' });
    };

    return Page;
};
