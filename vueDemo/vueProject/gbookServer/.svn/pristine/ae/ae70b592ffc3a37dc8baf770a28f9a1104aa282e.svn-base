/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('adviertisement', {
		adviertisement_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		adviertisement_title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		adviertisement_state: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		},
		adviertisement_image1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		adviertisement_image2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		adviertisement_image3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		adviertisement_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		adviertisement_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		adviertisement_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		is_relevance: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		relevance_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		createtime: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'adviertisement',
		freezeTableName: true,
		timestamps: false
	});
};
