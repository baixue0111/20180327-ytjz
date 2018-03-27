/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_partake', {
		activity_partake_id: {
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
		right_answers: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		participation_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		participation_equipment: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		is_allright: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'activity_partake',
		freezeTableName: true,
		timestamps: false
	});
};
