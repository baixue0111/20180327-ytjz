/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sysaccount', {
		sysaccount_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sysaccount_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sysaccount_password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sysaccount_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		sysaccount_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		login_count: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		login_ip: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sysaccount_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		register_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '1'
		}
	}, {
		tableName: 'sysaccount',
		freezeTableName: true,
		timestamps: false
	});
};
