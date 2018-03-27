/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('drs_control_resources', {
		drs_control_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		drs_control_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		drs_control_state: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		small_img_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '2'
		},
		small_img_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		act_res_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		small_control_url: {
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
		res_ascription: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '4'
		},
		res_mode: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		business_scope: {
			type: DataTypes.STRING,
			allowNull: true
		},
		res_class: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		downloads: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		collections: {
			type: DataTypes.INTEGER(11),
			allowNull: true
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
			type: DataTypes.STRING,
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
		authorization_ascription: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		authorization_author: {
			type: DataTypes.STRING,
			allowNull: true
		},
		authorization_comid: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		source_work_author: {
			type: DataTypes.STRING,
			allowNull: true
		},
		source_work_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		authorization_class: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		authorization_mode: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		authorization_price: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: '0.00'
		},
		authorization_date_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		authorization_begin_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		authorization_end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		authorization_count: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		authorization_area: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '中国'
		},
		authorization_purpose: {
			type: DataTypes.STRING,
			allowNull: true
		},
		res_introduce: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		recommended: {
			type: DataTypes.TEXT,
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
		copyright_notice: {
			type: DataTypes.INTEGER(6),
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
		tableName: 'drs_control_resources',
		freezeTableName: true,
		timestamps: false
	});
};
