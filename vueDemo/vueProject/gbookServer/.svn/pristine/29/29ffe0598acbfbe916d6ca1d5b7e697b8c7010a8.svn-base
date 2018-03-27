/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('login', {
		login_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		login_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		login_password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		login_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		user_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		login_count: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		login_ip: {
			type: DataTypes.STRING,
			allowNull: true
		},
		login_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		unique_id: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		register_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		modify_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue:  DataTypes.NOW
		}
	}, {
		tableName: 'login',
		freezeTableName: true,
		timestamps: false
	});
};
