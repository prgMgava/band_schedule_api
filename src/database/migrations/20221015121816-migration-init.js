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
      first_name: { type: DataTypes.STRING(50), allowNull: true },
      last_name: { type: DataTypes.STRING(50), allowNull: true },
      email: {
        type: DataTypes.STRING(150),
        unique: true,
      },
      cellphone: { type: DataTypes.STRING(50), allowNull: true },
      password: DataTypes.STRING(150),
      admin: DataTypes.BOOLEAN,
      super_admin: DataTypes.BOOLEAN,
    })

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
