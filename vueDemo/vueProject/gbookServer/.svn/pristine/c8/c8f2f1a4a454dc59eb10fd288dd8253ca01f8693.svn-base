/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_prize_affiche', {
		luck_prize_affiche_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		luck_prize_affiche_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		luck_prize_affiche_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		luck_activity_list_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		goods_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		luck_prize_time_record_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		total_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		operation_value: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		total_number: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		base_value: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '10000001'
		},
		lucky_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		announce_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		prize_remarks: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'luck_prize_affiche',
		freezeTableName: true,
		timestamps: false
	});
};
