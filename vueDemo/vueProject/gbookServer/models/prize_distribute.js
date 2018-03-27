/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prize_distribute', {
		prize_distribute_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prize_distribute_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		prize_distribute_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},		
		algorithm_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		partake_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		partake_pkid: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		activity_prize_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		prize_distribute_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		secrectkey: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		ciphertext: {
			type: DataTypes.STRING,
			allowNull: true
		},
		comparisonstr: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '1'
		}
	}, {
		tableName: 'prize_distribute',
		freezeTableName: true,
		timestamps: false
	});
};
