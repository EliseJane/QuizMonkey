var observableModule = require("data/observable");
var mockQuestionsData = require("../../mockData/mockQuestionsData.json");
var config = require("../../shared/config");

function quizViewModel (quiz) {
  var viewModel = new observableModule.fromObject(quiz);
  viewModel.currentScore = 0;

  loadBackEndDataQuestions = function () {
    return fetch(config.apiUrl + 'quizzes/' + quiz.id + '/questions')
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        viewModel.questions = data;
      })
  };

  loadMockDataQuestions = function () {
    var quizRelatedQuestions = mockQuestionsData.filter(q => q.quiz_id === quiz.id);
    viewModel.questions = quizRelatedQuestions;
  }

  viewModel.loadQuestions = function () {
    if (config.useMockData) {
      return new Promise(resolve =>
        setTimeout(resolve, 2000)
      ).then(loadMockDataQuestions);
    } else {
      return new Promise(resolve =>
        setTimeout(resolve, 2000)
      ).then(loadBackEndDataQuestions);
    }
  }

  return viewModel;
}

module.exports = quizViewModel;
