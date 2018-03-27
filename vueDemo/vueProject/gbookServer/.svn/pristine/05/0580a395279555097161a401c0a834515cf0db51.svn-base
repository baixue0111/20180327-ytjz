/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prize_distribute_affiche', {
		prize_distribute_affiche_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prize_distribute_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
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
		activity_prize_detail_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		user_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true
		},
		is_notify: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		is_theaward: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		winning_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		prize_distribute_affiche_state:
		{
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		tableName: 'prize_distribute_affiche',
		freezeTableName: true,
		timestamps: false
	});
};
