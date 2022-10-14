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
                first_name: DataTypes.STRING(50),
                last_name: DataTypes.STRING(50),
                email: {
                    type: DataTypes.STRING(100),
                    unique: true,
                },
                cellphone: DataTypes.STRING(50),
                password: DataTypes.STRING(50),
                admin: DataTypes.BOOLEAN,
                super_admin: DataTypes.BOOLEAN,
                created_at: {
                    type: DataTypes.DATE,
                },
                updated_at: {
                    type: DataTypes.DATE,
                },
            },
            {
                sequelize,
            }
        );
    }
}

module.exports = User;
