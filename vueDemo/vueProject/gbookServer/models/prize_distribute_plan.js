/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prize_distribute_plan', {
		prize_distribute_plan_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		unique_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		prize_distribute_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		partake_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		partake_pkid: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		is_draw: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0'
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		activity_prize_detail_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
	}, {
		tableName: 'prize_distribute_plan',
		freezeTableName: true,
		timestamps: false
	});
};
