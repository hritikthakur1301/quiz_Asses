const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');

router.get('/', QuestionController.getAllQuestions);
router.get('/api/quiz', QuestionController.getQuizData);
router.post('/submit', QuestionController.submitAnswers);
router.get('/results', (req, res) => {
  const quizResults = req.session.quizResults;
  if (
    !quizResults ||
    !quizResults.results ||
    quizResults.results.length === 0
  ) {
    return res.render('result', { results: [], totalScore: 0, totalBlanks: 0 });
  }
  res.render('result', quizResults);
});
router.post('/questions', QuestionController.addQuestion);
router.get('/questions', QuestionController.getAllQuestions);

module.exports = router;
