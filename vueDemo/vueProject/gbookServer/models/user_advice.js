/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_advice', {
		user_advice_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_advice_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		user_advice_contactdetails: {
			type: DataTypes.STRING,
			allowNull: true
		},
		user_advice_content: {
			type: DataTypes.STRING,
			allowNull: true
		},
		user_advice_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'user_advice',
		freezeTableName: true,
		timestamps: false
	});
};
