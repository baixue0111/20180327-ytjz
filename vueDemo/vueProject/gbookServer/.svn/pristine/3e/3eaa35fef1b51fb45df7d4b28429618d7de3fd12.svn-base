/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_detail', {
		activitydetail_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		activity_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		commodity_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		adactivity_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ad_content: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ad_activity_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ad_activity_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ad_sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ad_remarks: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ad_shoppingguide:
		{
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'activity_detail',
		freezeTableName: true,
		timestamps: false
	});
};
