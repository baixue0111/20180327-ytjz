/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('book', {
		book_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		book_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		book_sub_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_full_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		english_book_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_uuid: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			defaultValue: DataTypes.UUIDV1
		},
		book_state: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		info_src: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		unit: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		auto_code: {
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
		isbn_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		average_unitprice: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		fore_discount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		sale_price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		pubpartner_id: {
			type: DataTypes.INTEGER(11),
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
		dimensionformat_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		bookformat_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		materialpaper_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		author_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		translator_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		bindingformat_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		booktype_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		responsibleeditor: {
			type: DataTypes.STRING,
			allowNull: true
		},
		publish_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		series_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		series_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		volume_number: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		release_version: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		printing_version: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		booksnumber: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		unitpiece: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		avebookweight: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		clawtype_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		page_number: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		word_number: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		sheet_count: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		ciptype_id: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		subject_keywords: {
			type: DataTypes.STRING,
			allowNull: true
		},
		common_keywords: {
			type: DataTypes.STRING,
			allowNull: true
		},
		knowledge_keywords: {
			type: DataTypes.STRING,
			allowNull: true
		},
		event_keywords: {
			type: DataTypes.STRING,
			allowNull: true
		},
		printing_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		composingtype_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		packing_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		book_cover: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_cover1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_cover2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_cover3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_cover4: {
			type: DataTypes.STRING,
			allowNull: true
		},
		book_cover5: {
			type: DataTypes.STRING,
			allowNull: true
		},
		catalogue: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		foreword: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		editorial_review: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		book_selling_point: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		reader: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		media_review: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		experts_comment: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		author_introduce: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		content_abstract: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		pubpartner_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ciptype_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sort_index: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		assign_class: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW
		},
		phonetic_key: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sys_goods_class_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		classtags: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'book',
		freezeTableName: true,
		timestamps: false
	});
};
