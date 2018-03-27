/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sponsor', {
		sponsor_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sponsor_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		current_state: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		sponsor_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_full_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_english_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_state: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		sponsor_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		sponsor_property: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		office_address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		office_phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		postcode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		juridical_person: {
			type: DataTypes.STRING,
			allowNull: true
		},
		web_address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fax_phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		mobile_phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_person: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contact_phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		area_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		province_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		city_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		popedom_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		account_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		account_bank: {
			type: DataTypes.STRING,
			allowNull: true
		},
		bank_account_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		valueadded_tax_account: {
			type: DataTypes.STRING,
			allowNull: true
		},
		register_no: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_capital: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_taxrate: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		sponsor_ascription: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		invoice_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		invoice_rise: {
			type: DataTypes.STRING,
			allowNull: true
		},
		invoice_address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		invoice_item: {
			type: DataTypes.STRING,
			allowNull: true
		},
		financial_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1			
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
		sponsor_introduce: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		sponsor_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_remarks: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		is_cooperativepress: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '0'
		},
		phonetic_key: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_publisher: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '0'
		},
		publishingzone_logo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		publishingzone_image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sponsor_message: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'sponsor',
		freezeTableName: true,
		timestamps: false
	});
};
