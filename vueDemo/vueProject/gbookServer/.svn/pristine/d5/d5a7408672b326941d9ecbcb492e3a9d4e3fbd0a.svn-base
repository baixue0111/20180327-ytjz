/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('drs_resources', {
		drs_resources_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		drs_resources_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		drs_resources_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'			
		},
		small_img_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		big_img_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		act_res_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		keyword1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		keyword2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		tags: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ascription: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		res_mode: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		res_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		integrate: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		res_class: {
			type: DataTypes.STRING,
			allowNull: true
		},
		downloads: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		star_level: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '5'
		},
		res_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		res_format: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		pixelsize: {
			type: DataTypes.STRING,
			allowNull: true
		},
		filesize: {
			type: DataTypes.STRING,
			allowNull: true
		},
		res_purpose: {
			type: DataTypes.STRING,
			allowNull: true
		},
		recommended: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phonetic_key: {
			type: DataTypes.STRING,
			allowNull: true
		},
		res_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
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
		small_control_url: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'drs_resources',
		freezeTableName: true,
		timestamps: false
	});
};
