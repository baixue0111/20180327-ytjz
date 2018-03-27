/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wechat_login_info', {
		wechat_login_info_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ascription_type: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '1'
		},
		ascription_pkid: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		tousername: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fromusername: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createtime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		msgtype: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sessionid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		msgid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		openid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_effective: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: 1
		}		
	}, {
		tableName: 'wechat_login_info',
		freezeTableName: true,
		timestamps: false
	});
};
