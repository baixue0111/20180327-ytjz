/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('country', {
		country_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		country_domainname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		country_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		country_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		country_englishname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'country',
		freezeTableName: true,
		timestamps: false
	});
};
