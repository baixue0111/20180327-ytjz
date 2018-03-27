/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('activity_questions', {
		activity_questions_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		activity_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		sort_index: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		question_content: {
			type: DataTypes.STRING,
			allowNull: false
		},
		question_type: {
			type: DataTypes.INTEGER(4),
			allowNull: true
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
		},
		questions_adviertise:
		{
			type: DataTypes.STRING,
			allowNull: true
		},
		adviertise_url:
		{
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'activity_questions',
		freezeTableName: true,
		timestamps: false
	});
};
