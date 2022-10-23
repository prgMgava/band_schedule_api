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
			},
			{
				sequelize,
				tableName: 'band'
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Appointment, { foreignKey: 'id_band', as: 'appointments' });
		this.belongsTo(models.User, { foreignKey: 'owner', as: "user", constraints: true });
	}
}

module.exports = Band;
