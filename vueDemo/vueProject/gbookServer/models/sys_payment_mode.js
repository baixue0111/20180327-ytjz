/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_payment_mode', {
		sys_payment_mode_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sys_payment_mode_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		payment_type_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		payment_card: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'sys_payment_mode',
		freezeTableName: true,
		timestamps: false
	});
};
