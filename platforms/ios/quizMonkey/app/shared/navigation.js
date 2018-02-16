var frameModule = require('ui/frame');

exports.goToQuizList = function () {
  var topmost = frameModule.topmost();
  topmost.navigate("views/quiz-list-view/quiz-list-view");
}

exports.startupView = function () {
  return "views/welcome-view/welcome-view";
}

exports.goToQuestionView = function (quiz, index) {
  var topmost = frameModule.topmost();
  topmost.navigate({
    moduleName: 'views/question-view/question-view',
    context: { quiz: quiz, currentQuestionIndex: index },
    backstackVisible: false,
    transition: {
      name: "slide",
      duration: 350,
      curve: "easeIn"
    }
  });
}
