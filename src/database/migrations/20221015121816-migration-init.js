'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(150),
        unique: true,
      },
      cellphone: { type: DataTypes.STRING(50), allowNull: true },
      password: DataTypes.STRING(150),
      admin: DataTypes.BOOLEAN,
      super_admin: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      is_deleted: { type: DataTypes.BOOLEAN },
      band_visibility: DataTypes.INTEGER
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};
