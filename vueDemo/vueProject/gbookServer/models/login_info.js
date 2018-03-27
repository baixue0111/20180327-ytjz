/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('login_info', {
		loginlog_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		login_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		login_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		out_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		login_host: {
			type: DataTypes.STRING,
			allowNull: true
		},
		login_ip: {
			type: DataTypes.STRING,
			allowNull: true
		},
		login_src: {
			type: DataTypes.STRING,
			allowNull: true
		},
		login_host_info: {
			type: DataTypes.STRING,
			allowNull: true
		},
		longitude: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		latitude: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		login_country: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		login_province: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		login_city: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		login_street: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		}
	}, {
		tableName: 'login_info',
		freezeTableName: true,
		timestamps: false
	});
};
