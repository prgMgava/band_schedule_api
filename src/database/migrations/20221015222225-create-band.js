'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('band', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(150),
        unique: true,
      },
      cellphone: { type: DataTypes.STRING(50), allowNull: true },
      status: DataTypes.BOOLEAN,
      owner: {
        type: DataTypes.INTEGER,
        references: { model: 'user', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('band');
  }
};
