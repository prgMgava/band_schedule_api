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
                email: {
                    type: DataTypes.STRING(150),
                    unique: true,
                },
                cellphone: { type: DataTypes.STRING(50), allowNull: true },
                password: DataTypes.STRING(150),
                admin: DataTypes.BOOLEAN,
                super_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
                is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
                band_visibility: DataTypes.INTEGER
            },
            {
                sequelize,
                tableName: 'user'
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Band, { foreignKey: 'owner', as: 'band' });
    }
}

module.exports = User;
