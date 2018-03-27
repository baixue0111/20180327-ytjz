/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_invoice', {
		user_invoice_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		invoice_type_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		invoice_header_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		invoice_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		invoice_content_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		is_default: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'user_invoice',
		freezeTableName: true,
		timestamps: false
	});
};
