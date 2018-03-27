/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('region', {
		region_id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		region_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		region_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		superior_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		region_level: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		},
		last_stage: {
			type: DataTypes.INTEGER(6),
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
		tableName: 'region',
		freezeTableName: true,
		timestamps: false
	});
};
