/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('constgroupset', {
		group_id: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			primaryKey: true
		},
		sort_index: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		stored_value: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			primaryKey: true
		},
		display_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1'
		},
		is_sys: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1'
		},
		const_desc: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'constgroupset',
		freezeTableName: true,
		timestamps: false
	});
};
