/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_receipt_address', {
		user_receipt_address_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		country_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		area_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		province_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		city_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contacts: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_way: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_default: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'user_receipt_address',
		freezeTableName: true,
		timestamps: false
	});
};
