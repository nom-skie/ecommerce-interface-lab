//PROBLEM 4

let playerList = [ {name: "Alice", score: 7},
                {name: "Bob", score: 5}, 
                {name: "Francis", score: 9}, 
                {name: "JP", score: 9},
                {name: "Jayson", score: 10},
                {name: "Mila Jane", score: 10},
                {name: "Richard", score: 4},
                {name: "Anna", score: 4},
                {name: "Mike", score: 2}, 
                {name: "Ruby", score: 10}, ]

function getTopScores(playerList){
    let leaderboard = playerList.filter(player => player.score > 8). map(player => player.name).join(", ");

    return leaderboard;
}
console.log(`Top Scorers: ${getTopScores(playerList)}`)
