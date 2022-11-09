'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('appointment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(5000),
      },
      cellphone: { type: DataTypes.STRING(50), allowNull: true },
      status: { type: DataTypes.STRING(25), defaultValue: 'agendado' },
      id_band: {
        type: DataTypes.INTEGER,
        references: { model: 'band', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_label: {
        type: DataTypes.INTEGER,
        references: { model: 'label', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      start_date: DataTypes.DATE,
      street: DataTypes.STRING(50),
      district: DataTypes.STRING(50),
      state: DataTypes.STRING(2),
      city: DataTypes.STRING(50),
      address_number: DataTypes.STRING(10),
      address_complement: DataTypes.STRING(150),
      end_date: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      event: DataTypes.STRING(20),
      money: DataTypes.STRING(20),
      company_name: DataTypes.STRING(200),
      contractor: DataTypes.STRING(200),
      company_cellphone: DataTypes.STRING(200),
      company_contact: DataTypes.STRING(200),
      company_email: DataTypes.STRING(200),
      emphasis: DataTypes.STRING(5000),
      observations: DataTypes.STRING(5000),
      creator: DataTypes.STRING(200),
      expanse: DataTypes.STRING(5000),
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('appointment');
  }
};
