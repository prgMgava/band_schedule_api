"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("creditor", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      is_supplier: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      name: {
        type: DataTypes.STRING(500),
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      is_deleted: { type: DataTypes.BOOLEAN },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("creditor");
  },
};
