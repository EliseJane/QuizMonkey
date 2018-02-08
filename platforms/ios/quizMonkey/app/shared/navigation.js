var frameModule = require('ui/frame');

exports.goToQuizList = function () {
  var topmost = frameModule.topmost();
  topmost.navigate("views/quiz-list-view/quiz-list-view");
}

exports.startupView = function () {
  return "views/quiz-list-view/quiz-list-view";
}

exports.goToQuestionView = function () {
  var topmost = frameModule.topmost();
  topmost.navigate({
    moduleName: 'views/question-view/question-view'
  });
}
