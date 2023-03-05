import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize/types";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  cellphone: string;
  admin: boolean;
  password: string;
  super_admin: boolean;
  is_deleted: boolean;
  band_visibility?: number;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {
  static init(sequelize) {
    super.init(
      {
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
        super_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
        band_visibility: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "user",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Band, { foreignKey: "owner", as: "band" });
  }
}
