const QuestionService = require('../services/questionService');
const session = require('express-session');
class QuestionController {
  async addQuestion(req, res) {
    try {
      const question = await QuestionService.addQuestion(req.body);
      return res.status(201).json({ success: true, data: question });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllQuestions(req, res) {
    try {
      const questions = await QuestionService.getQuestions();
      return res.render('quiz', { questions }); // Send questions to frontend
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getQuizData(req, res) {
    try {
      const questions = await QuestionService.getQuestions();
      return res.status(200).json({ success: true, data: questions });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async submitAnswers(req, res) {
    try {
      const userAnswers = req.body.answers;
      if (!userAnswers || !Array.isArray(userAnswers)) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid answer format' });
      }
      const questions = await QuestionService.getQuestions();
      let totalScore = 0;
      let totalBlanks = 0;

      const results = questions.map((question, qIndex) => {
        let questionScore = 0;
        let questionBlanks = question.correct_answers.length;

        const userAnswersForQuestion = userAnswers[qIndex] || [];
        const processedAnswers = question.correct_answers.map(
          (correctAnswer, aIndex) => {
            let userAnswer =
              userAnswersForQuestion.answers[aIndex] || '(empty)';
            let isCorrect = userAnswer === correctAnswer;

            if (isCorrect) questionScore++;
            return { userAnswer, correctAnswer, isCorrect };
          }
        );

        totalScore += questionScore;
        totalBlanks += questionBlanks;

        return {
          title: question.title,
          textParts: question.text.split('___'),
          processedAnswers,
          questionScore,
          questionBlanks,
        };
      });
      req.session.quizResults = { results, totalScore, totalBlanks };

      return res.json({ success: true, redirect: '/results' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}

module.exports = new QuestionController();
