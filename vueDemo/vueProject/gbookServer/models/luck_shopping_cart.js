/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_shopping_cart', {
		luck_shopping_cart_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		cart_cookie_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		buy_amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		buy_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		goods_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'luck_shopping_cart',
		freezeTableName: true,
		timestamps: false
	});
};
