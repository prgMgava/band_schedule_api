const { Model, DataTypes } = require("sequelize");

class Creditor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        is_supplier: {
          type: DataTypes.BOOLEAN(),
          defaultValue: false,
        },
        name: {
          type: DataTypes.STRING(250),
        },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      },
      {
        sequelize,
        tableName: "Creditors",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Checkout, {
      foreignKey: "id_checkout",
      as: "checkout",
    });
  }
}

module.exports = Creditor;
