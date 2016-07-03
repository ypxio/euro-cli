var RequestPromise = require('request-promise');
var API_URL = "http://api.football-data.org";


class FootballData {
  
  constructor(apiToken) {
    this.apiToken = apiToken
  }
  
  getRequest(path) {
    return {
      uri: API_URL + path,
      headers: {
          'X-Auth-Token': this.apiToken
      },
      json: true
    }
  }

  getSession(sessionID) {
    return RequestPromise(this.getRequest(`/v1/soccerseasons/${sessionID}`))
  }

  getCountryLists(sessionID) {
    return RequestPromise(this.getRequest(`/v1/soccerseasons/${sessionID}/teams`))
  }

  getCountryFixtures(countryID) {
    return RequestPromise(this.getRequest(`/v1/teams/${countryID}/fixtures`));
  }

  getCountryID(countryURL) {
    var countryURLSplitted = countryURL.split("/");
    var countryID = countryURLSplitted[countryURLSplitted.length-1];
    return countryID;
  }

  getGroupDetails(sessionID) {
    return RequestPromise(this.getRequest(`/v1/soccerseasons/${sessionID}/leagueTable`));
  }

}

module.exports = FootballData;