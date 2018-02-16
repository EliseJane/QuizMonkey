var observableModule = require("data/observable");
var mockQuestionsData = require("../../mockData/mockQuestionsData.json");
var config = require("../../shared/config");
var utilities = require("../../shared/utilities");

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

  viewModel.incrementScore = function () {
    var newScore = viewModel.currentScore + 1;
    viewModel.currentScore = newScore;
  }

  postScore = function(finalScore) {
    return fetch(config.apiUrl + 'quizzes/' + quiz.id, {
      method: "PATCH",
      ody: JSON.stringify({
        score: finalScore,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleErrors);
  }

  viewModel.finalizeScore = function () {
    var correntAnswers = viewModel.currentScore;
    var quizLength = viewModel.questions.length;
    var finalScore = correntAnswers / quizLength;
    viewModel.set("finalScore", finalScore);
    var presentableScore = utilities.convertFractionToPercentageString(finalScore);
    viewModel.set("presentableScore", presentableScore);
    if (!config.usMockData) {
      postScore(finalScore);
    }
  }

  return viewModel;
}

module.exports = quizViewModel;
