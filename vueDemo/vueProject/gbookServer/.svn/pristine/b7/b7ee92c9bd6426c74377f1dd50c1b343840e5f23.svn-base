/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('messages', {
		messages_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		messages_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		messages_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		messages_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		messages_content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		attachment_url: {
			type: DataTypes.STRING,
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
		canceler: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		cancel_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		}
	}, {
		tableName: 'messages',
		freezeTableName: true,
		timestamps: false
	});
};
