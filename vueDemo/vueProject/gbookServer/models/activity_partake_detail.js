/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_partake_detail', {
		activity_partake_detail_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		activity_partake_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		activity_questions_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		user_answer: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_right: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'activity_partake_detail',
		freezeTableName: true,
		timestamps: false
	});
};
