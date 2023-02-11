const { Model, DataTypes } = require("sequelize");

class Checkout extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				value: {
					type: DataTypes.DECIMAL(20,2),
				},
				type: {
					type: DataTypes.INTEGER,
				},
                description: {
					type: DataTypes.STRING(5000),
				},
                date: {
					type: DataTypes.DATE,
				},
                owner: {
					type: DataTypes.STRING(250),
				},
				is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }

			},
			{
				sequelize,
				tableName: 'checkout'
			}
		);
	}

	static associate(models) {
		//this.hasOne(models.Appointment, { foreignKey: 'id', as: 'appointment' });
        this.hasOne(models.Band, { foreignKey: 'id', as: 'band' });
	}
}

module.exports = Checkout;