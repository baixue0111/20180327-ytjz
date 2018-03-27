/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_user_order', {
		luck_user_order_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		order_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		luck_user_order_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		coupon_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		payment_mode_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		buy_amount_sum: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		buy_money_sum: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		freight: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		delivery_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		user_receipt_address_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		submitter: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		submit_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		settlementer: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		settlement_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		paymenter: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		payment_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		consignorer: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		consignor_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		receipter: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		receipt_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		evaluater: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		evaluate_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		finisher: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		finish_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		luck_user_order_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		order_remarks: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'luck_user_order',
		freezeTableName: true,
		timestamps: false
	});
};
