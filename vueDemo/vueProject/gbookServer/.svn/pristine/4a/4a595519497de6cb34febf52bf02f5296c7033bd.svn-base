/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_activity_list', {
		luck_activity_list_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		activity_list_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_list_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: 1
		},
		activity_list_progress: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: 1
		},
		category_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		hot_label: {
			type: DataTypes.STRING,
			allowNull: true
		},
		vest_area_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		vest_value: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		sponsor_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		goods_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		relevance_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		activity_keywords: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		hold_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		hold_sub: {
			type: DataTypes.STRING,
			allowNull: true
		},
		plan_amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		act_amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		remain_amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		restrictions_amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		activity_unit_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		plan_begin_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		plan_end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		act_begin_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		act_end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		act_announce_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
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
		auditor: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		audit_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		releaser: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		release_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		activity_list_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		announced_duration: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '6'
		},
		stock_amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '1'
		},
		sys_goods_class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '1'
		},
		phonetic_key: {
			type: DataTypes.STRING,
			allowNull: true
		},
		classtags: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_announced: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		hold_sum_number: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '1'
		},
		luck_activity_image: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		tableName: 'luck_activity_list',
		freezeTableName: true,
		timestamps: false
	});
};
