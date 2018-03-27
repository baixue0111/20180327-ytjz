/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_prize_time_record', {
		luck_prize_time_record_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		luck_user_order_detail_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		buy_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		time_factor: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'luck_prize_time_record',
		freezeTableName: true,
		timestamps: false
	});
};
