/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_get_prize', {
		activity_get_prize_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		activity_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		activity_prize_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		is_notify: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		is_theaward: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		winning_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'activity_get_prize',
		freezeTableName: true,
		timestamps: false
	});
};
