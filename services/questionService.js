const QuestionDao = require('../dao/questionDao');

class QuestionService {
  async addQuestion(data) {
    if (
      !data.title ||
      !data.text ||
      !data.options ||
      !data.correct_answers ||
      !data.time_limit
    ) {
      throw new Error('Missing required fields');
    }
    return await QuestionDao.createQuestion(data);
  }

  async getQuestions() {
    return await QuestionDao.getAllQuestions();
  }

  async getQuestionById(id) {
    return await QuestionDao.getQuestionById(id);
  }

  async removeQuestion(id) {
    return await QuestionDao.deleteQuestion(id);
  }
}

module.exports = new QuestionService();
