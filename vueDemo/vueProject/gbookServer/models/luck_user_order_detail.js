/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_user_order_detail', {
		luck_user_order_detail_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		luck_user_order_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		lucky_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		luck_activity_list_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		buy_price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		buy_amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		buy_money: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		buy_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'luck_user_order_detail',
		freezeTableName: true,
		timestamps: false
	});
};
