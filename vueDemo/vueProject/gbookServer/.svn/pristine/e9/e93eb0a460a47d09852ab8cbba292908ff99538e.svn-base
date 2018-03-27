/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('commodity', {
		commodity_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		commodity_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		commodity_aliasname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		commodity_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			defaultValue: DataTypes.UUIDV1
		},
		commodity_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		bar_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		bar_code_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		introduction: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		supplier_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		supplier_commodity_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		commodity_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		commodity_price: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		commodity_discount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		shelves_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		views_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		commodity_type: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		share_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		activity_times: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		specifications: {
			type: DataTypes.STRING,
			allowNull: true
		},
		commodity_property: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'commodity',
		freezeTableName: true,
		timestamps: false
	});
};
