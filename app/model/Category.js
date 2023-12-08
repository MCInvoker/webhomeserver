'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Category = app.model.define('categories', {
        category_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        page_id: INTEGER,
        category_name: STRING(255),
        description: STRING(255),
        // created_at: DATE,
        // updated_at: DATE,
        is_deleted: { type: INTEGER, defaultValue: 0 }
    });

    Category.associate = function () {
        app.model.Category.belongsTo(app.model.Page, { foreignKey: 'page_id' });
        app.model.Category.hasMany(app.model.Link, { foreignKey: 'category_id' });
    };

    return Category;
};
