const { Model, DataTypes } = require("sequelize");

class Event extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				name: DataTypes.STRING(100),
				cellphone: DataTypes.STRING(50),
				data: DataTypes.DATE,
				street: DataTypes.STRING(50),
				district: DataTypes.STRING(50),
				state: DataTypes.STRING(2),
				city: DataTypes.STRING(50),
				place: DataTypes.STRING(50),
				house_number: DataTypes.STRING(10),
				address_complement: DataTypes.STRING(150),
				status: { type: DataTypes.STRING(25), defaultValue: 'agendado' },
				duration: DataTypes.INTEGER
			},
			{
				sequelize,
				tableName: 'event'
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Band, { foreignKey: 'id_band', as: 'band' });
	}
}

module.exports = Event;
