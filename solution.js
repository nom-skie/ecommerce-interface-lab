
//PROBLEM_3
function calculateTotal(...numbers){
    let sum = numbers.reduce((total, current) => total + current, 0)

    return sum;
}

console.log(calculateTotal(1,2,3,4,5,6,7,8,9));


