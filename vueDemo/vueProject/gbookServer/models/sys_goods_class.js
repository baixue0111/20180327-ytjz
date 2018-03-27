/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_goods_class', {
		sys_goods_class_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sys_goods_class_ccode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sys_goods_class_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		parent_ccode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sys_goods_class_ecode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sys_goods_class_ncode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '1'
		}
	}, {
		tableName: 'sys_goods_class',
		freezeTableName: true,
		timestamps: false
	});
};
