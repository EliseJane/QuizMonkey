// var ObservableArray = require("data/observable-array").ObservableArray;
// var mockQuizzesData = require("../../mockData/mockQuizzesData.json");

// function QuizListViewModel(items) {
//   var viewModel = new ObservableArray(items);
//
//   addQuizzesToViewModel = function (quizzes) {
//     for (i = 0; i < quizzes.length; i++) {
//       viewModel.push({
//         id: quizzes[i]._id,
//         name: quizzes[i].name,
//         image: quizzes[i].image
//       });
//     }
//   };
//
//   loadMockDataQuizzes = function () {
//     addQuizzesToViewModel(mockQuizzesData);
//   };
//
//   viewModel.loadQuizzes = function () {
//     loadMockDataQuizzes();
//   };
//
//   return viewModel;
// }
//
// module.exports = QuizListViewModel;
