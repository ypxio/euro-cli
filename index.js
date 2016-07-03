#! /usr/bin/env node

const meow = require('meow');
var jsonQuery = require('json-query');
var FootballDataAPI = require('./api.js');
var fdapi = new FootballDataAPI('dcc0cae29b01472eb6af5d399513b835');
var Render = new (require('./render.js'))();
const sessionID = 424; 

const cli = meow(`
  Usage
    $ ./index.js <input>

    Options
      -h, --help  Show help

    Examples
      $ node index.js England
    
    Results
    
      England Match Results
      -----------------------------
      (1-1) England vs Russia
      (2-1) England vs Wales
      (0-0) Slovakia vs England
      (null-null) England vs Iceland

      [GROUP B] Classement
      ┌────────────────────┬─────┬─────┬─────┬─────┬──────────┐
      │ Country            │ P   │ F   │ A   │ D   │ Point    │
      ├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
      │ Wales              │ 3   │ 6   │ 3   │ 3   │ 6        │
      ├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
      │ England            │ 3   │ 3   │ 2   │ 1   │ 5        │
      ├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
      │ Slovakia           │ 3   │ 3   │ 3   │ 0   │ 4        │
      ├────────────────────┼─────┼─────┼─────┼─────┼──────────┤
      │ Russia             │ 3   │ 2   │ 6   │ -4  │ 1        │
      └────────────────────┴─────┴─────┴─────┴─────┴──────────┘
`, {
  alias: {
      r: 'rainbow'
  }
});

var input = cli.input[0];

fdapi.getCountryLists(sessionID)
.then((res) => {
  var country = jsonQuery('teams[name=' + input + ']._links', {
    data: res
  });
  var countryURL = country.value.self.href
  var countryID = fdapi.getCountryID(countryURL)
  return Promise.all([
    fdapi.getCountryFixtures(countryID),
    fdapi.getGroupDetails(sessionID),
    Promise.resolve(countryID)
  ])
})
.then((promiseResult) => {
  var CountryFixtures = promiseResult[0]
  var GroupDetails = promiseResult[1]
  var countryID = promiseResult[2]

  Render.Fixtures(CountryFixtures.fixtures, input)
  Render.LeagueTable(GroupDetails, countryID, input)

})




