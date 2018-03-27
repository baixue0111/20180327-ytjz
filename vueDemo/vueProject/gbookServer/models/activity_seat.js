/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_seat', {
		activity_seat_id: {
			type: DataTypes.INTEGER(5),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		seat_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		seat_ejs_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'activity_seat',
		freezeTableName: true,
		timestamps: false
	});
};
