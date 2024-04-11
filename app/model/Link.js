"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Link = app.model.define("links", {
    link_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    page_id: INTEGER,
    category_id: INTEGER,
    created_by: INTEGER,
    link_name: STRING(255),
    url: STRING(255),
    description: STRING(255),
    // created_at: DATE,
    // updated_at: DATE,
    is_deleted: { type: INTEGER, defaultValue: 0 },
  });

  Link.associate = function () {
    app.model.Link.belongsTo(app.model.Page, { foreignKey: "page_id" });
    app.model.Link.belongsTo(app.model.Category, { foreignKey: "category_id" });
  };

  return Link;
};
