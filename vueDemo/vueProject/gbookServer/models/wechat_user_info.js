/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wechat_user_info', {
		wechat_user_info_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		subscribe: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		openid: {
			type: DataTypes.STRING,
			allowNull: false
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sex: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		language: {
			type: DataTypes.STRING,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true
		},
		province: {
			type: DataTypes.STRING,
			allowNull: true
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true
		},
		headimgurl: {
			type: DataTypes.STRING,
			allowNull: true
		},
		subscribe_time: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		unionid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		groupid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'wechat_user_info',
		freezeTableName: true,
		timestamps: false
	});
};
