"use strict";

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const Page = app.model.define("pages", {
    page_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    created_by: INTEGER,
    page_name: STRING(255),
    description: STRING(255),
    is_deleted: { type: INTEGER, defaultValue: 0 },
  });

  Page.associate = function () {
    app.model.Page.belongsTo(app.model.User, { foreignKey: "created_by" });
    app.model.Page.hasMany(app.model.Category, { foreignKey: "page_id" });
  };

  return Page;
};
