const { Model, DataTypes } = require("sequelize");

class Checkout extends Model {
  static init(sequelize) {
    super.init(
      {
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
          type: DataTypes.TEXT,
        },
        date: {
          type: DataTypes.DATE,
        },
        owner: {
          type: DataTypes.STRING(250),
        },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      },
      {
        sequelize,
        tableName: "checkout",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Appointment, {
      foreignKey: "id_appointment",
      as: "appointment",
    });
    this.belongsTo(models.Band, { foreignKey: "id_band", as: "band" });
    this.belongsTo(models.Creditor, {
      foreignKey: "id_creditor",
      as: "creditor",
    });
  }
}

module.exports = Checkout;
