/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prize_investigation_questions', {
		prize_investigation_questions_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		prize_investigation_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		question_content: {
			type: DataTypes.STRING,
			allowNull: true
		},
		question_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			defaultValue: '1'
		},
		option_a: {
			type: DataTypes.STRING,
			allowNull: true
		},
		option_b: {
			type: DataTypes.STRING,
			allowNull: true
		},
		option_c: {
			type: DataTypes.STRING,
			allowNull: true
		},
		option_d: {
			type: DataTypes.STRING,
			allowNull: true
		},
		option_e: {
			type: DataTypes.STRING,
			allowNull: true
		},
		option_f: {
			type: DataTypes.STRING,
			allowNull: true
		},
		option_answer: {
			type: DataTypes.STRING,
			allowNull: true
		},
		questions_texts: {
			type: DataTypes.STRING,
			allowNull: true
		},
		texts_answer: {
			type: DataTypes.STRING,
			allowNull: true
		},
		question_score: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		question_remarks: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'prize_investigation_questions',
		freezeTableName: true,
		timestamps: false
	});
};
