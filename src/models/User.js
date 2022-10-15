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
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
            },
            {
                sequelize,
                tableName: 'user'
            }
        );
    }
}

module.exports = User;
