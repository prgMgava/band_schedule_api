const { Model, DataTypes } = require("sequelize");

class User extends Model {
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
                first_name: { type: DataTypes.STRING(50), allowNull: true },
                last_name: { type: DataTypes.STRING(50), allowNull: true },
                email: {
                    type: DataTypes.STRING(150),
                    unique: true,
                },
                cellphone: { type: DataTypes.STRING(50), allowNull: true },
                password: DataTypes.STRING(150),
                admin: DataTypes.BOOLEAN,
                super_admin: { type: DataTypes.BOOLEAN, defaultValue: false },

            },
            {
                sequelize,
                tableName: 'user'
            }
        );
    }

    static associate(models) {
        this.hasOne(models.Band, { foreignKey: 'owner', as: 'band' });
    }
}

module.exports = User;
