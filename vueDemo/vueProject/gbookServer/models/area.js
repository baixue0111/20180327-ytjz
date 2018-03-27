/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('area', {
		area_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		area_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		country_id: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'area',
		freezeTableName: true,
		timestamps: false
	});
};
