/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('info_comment', {
		info_comment_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		info_comment_title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		info_comment_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		info_comment_content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		fabulous_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		nofabulous_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		submitter: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		submit_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		auditor: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		audit_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		releaser: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		release_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		info_comment_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1			
		}
	}, {
		tableName: 'info_comment',
		freezeTableName: true,
		timestamps: false
	});
};
