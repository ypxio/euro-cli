var clc = require('cli-color');
var Table = require('cli-table');
var jsonQuery = require('json-query');

class Render {

  constructor() {
    this.clc = clc
  }

  Fixtures(fixtures, input) {
    console.log("\n");
    console.log("UEFA EURO 2016 CLI v1.0");
    console.log("\n");
    console.log( input + " Match Results");
    console.log("-----------------------------");

    var clc = this.clc

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
    })

  }

  LeagueTable(GroupDetails, countryID, input) {

    var clc = this.clc

    var standingTable = jsonQuery('standings[][teamId=' + countryID + '].group', {
      data: GroupDetails
    });

    console.log("\n");

    var groupData = jsonQuery('standings['+standingTable.value+']', {
      data: GroupDetails
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
    console.log(table.toString());
  }

}

module.exports = Render;