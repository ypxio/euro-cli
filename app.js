const meow = require('meow');
var jsonQuery = require('json-query');
var Table = require('cli-table');
var FootballDataAPI = require('./api.js');
var fdapi = FootballDataAPI('dcc0cae29b01472eb6af5d399513b835');
var clc = require('cli-color');
// const imageToAscii = require("image-to-ascii");

// imageToAscii("https://octodex.github.com/images/octofez.png", (err, converted) => {
//     console.log(err || converted);
// });


const cli = meow(`
  Usage
    $ node index.js <input>

    Options
      -r, --rainbow  Include a rainbow

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
var sessionID = 424; 

fdapi.getCountryLists(sessionID).then(function(res) {
  var country = jsonQuery('teams[name=' + input + ']._links', {
    data: res
  });
  var countryURL = country.value.self.href;
  var countryID = fdapi.getCountryID(countryURL);
  fdapi.getCountryFixtures(countryID).then(function(res) {
    fdapi.getGroupDetails(sessionID).then(function(res) {
      var standings = res;
      var standingTable = jsonQuery('standings[][teamId=' + countryID + '].group', {
        data: standings
      });

      console.log("\n");

      var groupData = jsonQuery('standings['+standingTable.value+']', {
        data: standings
      });
      console.log("[GROUP "+ standingTable.value +"] Classement");
      // console.log(groupData.value);
      var tableClassement = groupData.value;

      var table = new Table({
        head: [ 'Country',
                'P',
                'F',
                'A',
                'D',
                'Point'
              ]
        , colWidths: [20, 5, 5, 5, 5, 10]
      });

      tableClassement.forEach(function(val) {
        if(val.team == input) {
          table.push(
            [ 
              clc.green(val.team), 
              clc.green(val.playedGames), 
              clc.green(val.goals), 
              clc.green(val.goalsAgainst), 
              clc.green(val.goalDifference), 
              clc.green(val.points)
            ]
          );
        } else {
          table.push(
            [ val.team, val.playedGames, val.goals, val.goalsAgainst, val.goalDifference, val.points]
          );
        }
      });
      // console.log(table);
      console.log(table.toString());

    }).catch(function(err){
      console.log(err);
    });

    var fixtures = res.fixtures;
    console.log("\n");
    console.log("UEFA EURO 2016 CLI v1.0");
    console.log("\n");
    console.log( input + " Match Results");
    console.log("-----------------------------");
    Object.keys(fixtures).forEach(function(key) {
      var val = fixtures[key];
      var homeTeamName = val.homeTeamName;
      var awayTeamName = val.awayTeamName;
      var homeGoals = val.result.goalsHomeTeam;
      var awayGoals = val.result.goalsAwayTeam;

      if(val.status == 'FINISHED') {
        var goals = homeGoals + "-" + awayGoals;
        console.log(clc.green("(" + goals + ") " + homeTeamName + " vs " + awayTeamName))
      } else {
        var goals = '---';
        console.log("(" + goals + ") " + homeTeamName + " vs " + awayTeamName + clc.red(" ( Will be played on " + val.date + ")"));
      }
      // if(val.status == 'FINISHED') {
      // } else {
      // } 
      // var output = "(" + goals + ") " + homeTeamName + " vs " + awayTeamName;
      // if(val.status == 'TIMED') {
      //   output += " ( Will be played on " + val.date + ")";
      // }
      // console.log(output);
    });
  }).catch(function(err) {
    console.log(err);
  });
}).catch(function(err) {
  console.log(err);
})


