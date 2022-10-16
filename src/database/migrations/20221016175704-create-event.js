'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('event', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      cellphone: { type: DataTypes.STRING(50), allowNull: true },
      status: { type: DataTypes.STRING(25), defaultValue: 'agendado' },
      id_band: {
        type: DataTypes.INTEGER,
        references: { model: 'band', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      street: DataTypes.STRING(50),
      district: DataTypes.STRING(50),
      state: DataTypes.STRING(2),
      city: DataTypes.STRING(50),
      place: DataTypes.STRING(50),
      house_number: DataTypes.STRING(10),
      address_complement: DataTypes.STRING(150),
      duration: DataTypes.FLOAT,
      date: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('event');
  }
};
