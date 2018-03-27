/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tags_record', {
		tags_record_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		tags_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		tags_record_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		tags_record_pkid: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'tags_record',
		freezeTableName: true,
		timestamps: false
	});
};
