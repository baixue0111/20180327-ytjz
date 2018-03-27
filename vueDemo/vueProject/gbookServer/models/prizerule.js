/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prizerule', {
		prizerule_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prizerule_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		prizerule_formula: {
			type: DataTypes.STRING,
			allowNull: true
		},
		izerule_content: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'prizerule',
		freezeTableName: true,
		timestamps: false
	});
};
