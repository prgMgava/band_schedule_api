"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("checkout", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: DataTypes.DECIMAL(20, 2),
      },
      type: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING(500),
      },
      date: {
        type: DataTypes.DATE,
      },
      owner: {
        type: DataTypes.STRING(250),
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      is_deleted: { type: DataTypes.BOOLEAN },
      id_band: {
        type: DataTypes.INTEGER,
        references: { model: "band", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("checkout");
  },
};
