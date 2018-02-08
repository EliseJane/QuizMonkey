var QuizListViewModel = require('../../shared/view-models/quiz-list-view-model');
var QuizViewModel = require('../../shared/view-models/quiz-view-model');
var observableModule = require('data/observable');
var navigationModule = require("../../shared/navigation");

var vm = new QuizListViewModel();
var quizListData = new observableModule.fromObject({
  quizList: vm
});

exports.onQuizListPageLoaded = function (args) {
  page = args.object;
  page.bindingContext = quizListData;
  quizListData.set("isLoading", true);
  vm.clearQuizzes();
  vm.loadQuizzes().then(function () {
    quizListData.set("isLoading", false);
  });
};

exports.onSelectQuiz = function (args) {
  var selectedQuizData = args.view.bindingContext;
  var quiz = new QuizViewModel(selectedQuizData);
  quizListData.set("isLoading", true);
  quiz.loadQuestions().then(function () {
    quizListData.set("isLoading", false);
    var quizLength = quiz.questions.length;
    console.log("quizLength: " + quizLength);
  });
  if (quizLength > 0) {
    navigationModule.goToQuestionView();
  }
}
