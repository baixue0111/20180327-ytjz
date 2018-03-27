/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('province', {
		province_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		province_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		province_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		area_id: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'province',
		freezeTableName: true,
		timestamps: false
	});
};
