var QuestionViewModel = require('../../shared/view-models/question-view-model');
var observableModule = require("data/observable");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var navigationModule = require("../../shared/navigation");

var vm;
var quiz;
var questionIndex;
var quizLength;

var questionData = new observableModule.Observable();

exports.onQuestionPageLoaded = function (args) {
  var page = args.object;
  page.bindingContext = questionData;
}

exports.questionPageNavigatingTo = function (args) {
  var page = args.object;
  var context = page.navigationContext;
  setBackgroundColor();
  quiz = context.quiz;
  questionIndex = context.currentQuestionIndex;
  quizLength = quiz.questions.length;
  questionData.progress = `${questionIndex + 1} / ${quizLength}`;
  vm = new QuestionViewModel(quiz.questions[questionIndex]);
  vm.initQuestion();
  questionData.question = vm;
}

exports.onSelectMultipleChoiceAnswer = function (args) {
  disableList(args);
  var chosenAnswer = args.view.bindingContext;
  var answeredCorrectly = vm.checkMultipleChoiceAnswer(chosenAnswer);
  if (answeredCorrectly) {
    quiz.incrementScore();
  }
  setTimeout(navigateToNextPage, 1000);
}

setBackgroundColor = function () {
  var colors = ['#58406D', '#314D70', '#E54B04', '#007461',
'#655672', '#6B0758', '#513EE1', '#E00481', '#4D989E', '#3F7F47'];
  var backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  questionData.backgroundColor = backgroundColor;
}

disableList = function (args) {
  var parent = args.object.parent;
  if (parent) {
    var list = view.getViewById(parent, "answersListView");
    if (list) {
      list.removeEventListener(listViewModule.ListView.itemTapEvent);
    }
  }
}

navigateToNextPage = function () {
  if (quizLength > questionIndex + 1) {
    navigationModule.goToQuestionView(quiz, questionIndex + 1);
  } else {
    quiz.finalizeScore();
    navigationModule.goToQuizSummaryView(quiz);
  }
}
