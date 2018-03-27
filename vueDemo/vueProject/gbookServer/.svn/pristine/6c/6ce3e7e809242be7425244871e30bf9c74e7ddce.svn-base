/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_prize_detail', {
		activity_prize_detail_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		activity_prize_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		award_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		award_content: {
			type: DataTypes.STRING,
			allowNull: true
		},
		award_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		award_price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		award_number: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		award_remarks: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prizerule_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		award_type: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		computation_unit: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		}
	}, {
		tableName: 'activity_prize_detail',
		freezeTableName: true,
		timestamps: false
	});
};
