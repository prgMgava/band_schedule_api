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
        tableName: "creditor",
      }
    );
  }

  static associate(models) {
  }
}

module.exports = Creditor;
