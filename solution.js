function checkVariable(input){
    switch (typeof input){
        case "string":
            return "string";
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        case "bigint":
            return "bigint";
        case "undefined":
            return "undefined";
        case "object" :
            return "object";
        default:
            return "unknown type";
    }
}

console.log(checkVariable("Jayson"));
console.log(checkVariable(9));
console.log(checkVariable(true));
console.log(checkVariable(123456789012345678901234567890n));
console.log(checkVariable());
console.log(checkVariable(null));

// Problem 2

function generateIDs(count){
    let id=[];

//PROBLEM_3
function calculateTotal(...numbers){
    let sum = numbers.reduce((total, current) => total + current, 0)

    return sum;
}

console.log(calculateTotal(1,2,3,4,5,6,7,8,9));


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
// Problem 5

class Item{

    #discount = 0.1;

    constructor(name, price){
            this.name = name;
            this.price = price;
    }

    get finalPrice(){

        return this.price - (this.price *this.#discount);
    }
}


const monitor = new Item("144hz Display Monitor", 15000);

console.log(`Product Name: ${monitor.name}`);
console.log(`Original Price: ₱${monitor.price}`)
console.log(`Discounted Price: ₱${monitor.finalPrice}`);
// Problem 6

function safeDivide(a, b){
    try{
        if(b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a/b;
    }catch (error){
        return error.message;
    }finally {
        console.log("Operation attempted");
    }
}

console.log(safeDivide(9, 3));
console.log();
console.log(safeDivide(9, 0));
