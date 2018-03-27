/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prizerule_detail', {
		prizerule_detail_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prizerule_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		prizerule_item: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prizerule_value: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'prizerule_detail',
		freezeTableName: true,
		timestamps: false
	});
};
