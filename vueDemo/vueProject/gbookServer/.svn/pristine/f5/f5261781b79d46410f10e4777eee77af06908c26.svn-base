/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prize_investigation', {
		prize_investigation_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prize_investigation_title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		prize_investigation_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		prize_investigation_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		prize_investigation_keywords1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prize_investigation_keywords2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prize_investigation_abstract: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prize_investigation_content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		click_times: {
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
		prize_investigation_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		respondent: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_way: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'prize_investigation',
		freezeTableName: true,
		timestamps: false
	});
};
