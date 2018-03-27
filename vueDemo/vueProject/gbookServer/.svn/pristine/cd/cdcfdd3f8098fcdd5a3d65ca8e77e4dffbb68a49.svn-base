/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prizeissue_info', {
		prizeissue_info_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prize_distribute_affiche_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		prizeissuer: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		prizeissue_data: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		awardwinner: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		award_data: {
			type: DataTypes.DATE,
			allowNull: true
		},
		award_notes: {
			type: DataTypes.STRING,
			allowNull: true
		},
		award_address_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'prizeissue_info',
		freezeTableName: true,
		timestamps: false
	});
};
