/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_prize', {
		activity_prize_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		project_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		project_content: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		project_state: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'activity_prize',
		freezeTableName: true,
		timestamps: false
	});
};
