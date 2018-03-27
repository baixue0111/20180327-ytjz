/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('city', {
		city_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		city_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		province_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'city',
		freezeTableName: true,
		timestamps: false
	});
};
