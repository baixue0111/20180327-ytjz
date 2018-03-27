/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('adviertisement_relevance', {
		adv_relevance_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		adviertisement_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		adv_sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		relevance_pkid: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'adviertisement_relevance',
		freezeTableName: true,
		timestamps: false
	});
};
