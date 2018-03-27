/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_file_mime', {
		sys_file_mime_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sys_file_mime_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ascription_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'sys_file_mime',
		freezeTableName: true,
		timestamps: false
	});
};
