/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('webmenu', {
		webmenu_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		menu_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		menu_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		webmenu_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		parent_webmenu_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		menu_level: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		keywords: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fore_images: {
			type: DataTypes.STRING,
			allowNull: true
		},
		back_images: {
			type: DataTypes.STRING,
			allowNull: true
		},
		cmcss: {
			type: DataTypes.STRING,
			allowNull: true
		},
		target_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		file_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		folder_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		is_use: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '1'
		},
		webmenu_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		}
	}, {
		tableName: 'webmenu',
		freezeTableName: true,
		timestamps: false
	});
};
