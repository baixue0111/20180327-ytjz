/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('popedom', {
		popedom_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		popedom_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		popedom_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'popedom',
		freezeTableName: true,
		timestamps: false
	});
};
