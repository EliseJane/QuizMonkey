var socialShare = require("nativescript-social-share");
var vm;
var navigationModule = require("../../shared/navigation");

exports.summaryViewLoaded = function (args) {
  var page = args.object;
  vm = page.bindingContext;
}

exports.shareTapped = function (args) {
  var userScore = vm.get("presentableScore");
  var quizName = vm.get("name");
  socialShare.shareText("Hi, I just scored " + userScore + " on the " + quizName + " quiz in QuizMonkey - the best quiz app ever!");
}

exports.backToQuizListTapped = function (args) {
  navigationModule.goToQuizList();
}
