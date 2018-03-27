/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('luck_bask_order_images', {
		luck_bask_order_images_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		luck_bask_order_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		images_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'luck_bask_order_images',
		freezeTableName: true,
		timestamps: false
	});
};
