/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		nick_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		modify_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue:  DataTypes.NOW
		},
		sex: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		birth_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		pcard: {
			type: DataTypes.STRING,
			allowNull: true
		},
		blood_type: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		shape: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		marital_status: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		education_level: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		occupation: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING,
			allowNull: true
		},
		qq: {
			type: DataTypes.STRING,
			allowNull: true
		},
		weibo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		weixin: {
			type: DataTypes.STRING,
			allowNull: true
		},
		taobao: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		postcode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		other_contact: {
			type: DataTypes.STRING,
			allowNull: true
		},
		headimg: {
			type: DataTypes.STRING,
			allowNull: true
		},
		country: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		birthplace_area: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		birthplace_province: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		birthplace_city: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		birthplace_address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		residence_area: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		residence_province: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		residence_city: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		residence_address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		introduction: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		user_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		}
	}, {
		tableName: 'user',
		freezeTableName: true,
		timestamps: false
	});
};
