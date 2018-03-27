/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('articles', {
		articles_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		articles_title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		articles_sub_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		articles_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		articles_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		articles_author: {
			type: DataTypes.STRING,
			allowNull: true
		},
		articles_src: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		articles_keywords1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		articles_keywords2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		articles_cover1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		articles_cover2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		executive_editor: {
			type: DataTypes.STRING,
			allowNull: true
		},
		articles_content: {
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
		articles_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		}
	}, {
		tableName: 'articles',
		freezeTableName: true,
		timestamps: false
	});
};
