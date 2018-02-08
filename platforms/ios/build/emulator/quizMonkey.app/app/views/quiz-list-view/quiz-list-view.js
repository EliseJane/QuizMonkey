// var QuizListViewModel = require('../../shared/view-models/quiz-list-view-model');
// var observableModule = require('data/observable');

// var vm = new QuizListViewModel();
// var quizListData = new observableModule.fromObject({
//   quizList: vm
// });
//
// exports.onQuizListPageLoaded = function (args) {
//   page = args.object;
//   page.bindingContext = quizListData;
//   vm.loadQuizzes();
// };

exports.onQuizListPageLoaded = function() {
  console.log("HEELLLLLOOOOOO!!!!!!");
};

exports.onButtonTapped = function() {
  console.log('start button tapped');
};
