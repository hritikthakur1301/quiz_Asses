const Question = require('../model/questionModel');

class QuestionDao {
  async createQuestion(questionData) {
    return await Question.create(questionData);
  }

  async getAllQuestions() {
    return await Question.findAll();
  }

  async getQuestionById(id) {
    return await Question.findByPk(id);
  }

  async deleteQuestion(id) {
    return await Question.destroy({ where: { id } });
  }
}

module.exports = new QuestionDao();
