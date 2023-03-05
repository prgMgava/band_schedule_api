"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("checkout", "id_appointment", {
      type: DataTypes.INTEGER,
      references: { model: "appointment", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("checkout", "id_creditor", {
      type: DataTypes.INTEGER,
      references: { model: "creditor", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumns("checkout", [
      "id_evento",
      "id_creditor",
    ]);
  },
};
