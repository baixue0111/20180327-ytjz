/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_bask_order', {
		luck_bask_order_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		luck_bask_order_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		luck_user_order_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		evaluation_level: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		bask_content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		submit_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		is_have_img: {
			type: DataTypes.INTEGER(4),
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
		luck_bask_order_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		}
	}, {
		tableName: 'luck_bask_order',
		freezeTableName: true,
		timestamps: false
	});
};
