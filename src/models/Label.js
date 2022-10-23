const { Model, DataTypes } = require("sequelize");

class Label extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				title: {
					type: DataTypes.STRING(100),
					unique: true,
				},
				color: {
					type: DataTypes.STRING(20),
					unique: true,
				}
			},
			{
				sequelize,
				tableName: 'label'
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Appointment, { foreignKey: 'id_appointment', as: 'appointment' });
	}
}

module.exports = Label;
