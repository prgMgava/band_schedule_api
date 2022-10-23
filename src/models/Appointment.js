const { Model, DataTypes } = require("sequelize");

class Appointment extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				title: DataTypes.STRING(100),
				cellphone: DataTypes.STRING(50),
				start_date: {
					type: DataTypes.DATE,

				},
				end_date: DataTypes.DATE,
				street: DataTypes.STRING(50),
				district: DataTypes.STRING(50),
				state: DataTypes.STRING(2),
				city: DataTypes.STRING(50),
				address_number: DataTypes.STRING(10),
				address_complement: DataTypes.STRING(150),
				status: { type: DataTypes.STRING(25), defaultValue: 'agendado' },
			},
			{
				sequelize,
				tableName: 'appointment'
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Band, { foreignKey: 'id_band', as: 'band' });
		this.belongsTo(models.Label, { foreignKey: 'id_label', as: 'label' })
	}
}

module.exports = Appointment;
