const { Model, DataTypes } = require("sequelize");

class Band extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING(100),
					unique: true,
				},
				email: {
					type: DataTypes.STRING(150),
					unique: true,
				},
				cellphone: { type: DataTypes.STRING(50), allowNull: true },
				status: DataTypes.BOOLEAN
			},
			{
				sequelize,
				tableName: 'band'
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'id', as: "owner" })
	}
}

module.exports = Band;
