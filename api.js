var RequestPromise = require('request-promise');
var API_URL = "http://api.football-data.org";

function FootballData(apiToken) {
  if(!(this instanceof FootballData))
    return new FootballData(apiToken);
    this.apiToken = apiToken;
}

FootballData.prototype.getRequest = function (path) {
  return {
    uri: API_URL + path,
    headers: {
        'X-Auth-Token': this.apiToken
    },
    json: true
  };
}

FootballData.prototype.getSession = function (sessionID) {
  return RequestPromise(this.getRequest(`/v1/soccerseasons/${sessionID}`));
}

FootballData.prototype.getCountryLists = function (sessionID) {
  return RequestPromise(this.getRequest(`/v1/soccerseasons/${sessionID}/teams`));
}
FootballData.prototype.getCountryID = function (countryURL) {
  var countryURLSplitted = countryURL.split("/");
  var countryID = countryURLSplitted[countryURLSplitted.length-1];
  return countryID;
}
FootballData.prototype.getCountryFixtures = function (countryID) {
  return RequestPromise(this.getRequest(`/v1/teams/${countryID}/fixtures`));
}
FootballData.prototype.getGroupDetails = function (sessionID) {
  return RequestPromise(this.getRequest(`/v1/soccerseasons/${sessionID}/leagueTable`));
}
module.exports = FootballData;