/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tags', {
		tags_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		tags_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		tags_english: {
			type: DataTypes.STRING,
			allowNull: true
		},
		tags_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		articles_keywords1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		articles_keywords2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '1'
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'tags',
		freezeTableName: true,
		timestamps: false
	});
};
