/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prize_distribute_award', {
		prize_distribute_award_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prize_distribute_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		activity_prize_detail_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		begin_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		prize_num: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		prize_remain_num: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'prize_distribute_award',
		freezeTableName: true,
		timestamps: false
	});
};
