var useLocalMockData = true;
var serverIsRemote = false;
var platformModule = require('platform');
var accessPath;
var port = ":3001/";

if (serverIsRemote) {
  accessPath = "quizmonkeynodeapp.azurewebsites.net/";
  port = "";
} else if (platformModule.device.os === platformModule.platformNames.ios) {
  accessPath = "localhost";
} else if (platformModule.device.os === platformModule.platformNames.android) {
  accessPath = "10.0.2.2";
}

module.exports = {
  useMockData: useLocalMockData,
  apiUrl: "https://" + accessPath + port
};
