/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity', {
		activity_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		activity_title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		activity_state: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 1
		},
		activity_progress: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: 1
		},
		activity_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		activity_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		activity_content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		activity_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_attribution: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		sponsor_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		activity_type: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		sort_order: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		owned_industry: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		begin_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		duration_length: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		participation_limit: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		upper_limit: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		actual_participation: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		click_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		budget_amount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		activity_seat_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		is_top: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		top_time: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		release_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		releaser: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		wechat_icon: {
			type: DataTypes.STRING,
			allowNull: true
		},
		wechat_title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		wechat_description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		wechat_picurl: {
			type: DataTypes.STRING,
			allowNull: true
		},
		wechat_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		wechat_music: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_remarks: {
			type: DataTypes.STRING,
			allowNull: true
		},
		prizerule_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		wechat_is_push: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: 1
		},
		wechat_content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		activity_prize_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		phonetic_key: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_propaganda_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		openlottery_time:{
			type: DataTypes.STRING,
			allowNull: true
		},
		act_begin_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		act_end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		activity_src: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_tags: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_author: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sys_html_template_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		activity_file1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_file_url1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_file2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_file_url2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_file3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		activity_file_url3: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'activity',
		freezeTableName: true,
		timestamps: false
	});
};
