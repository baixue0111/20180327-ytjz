/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_html_template', {
		sys_html_template_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sys_html_template_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		template_type_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		template_file: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '1'
		}
	}, {
		tableName: 'sys_html_template',
		freezeTableName: true,
		timestamps: false
	});
};
