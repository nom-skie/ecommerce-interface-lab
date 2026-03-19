function generateIDs(count){
    let id=[];

    for(let i = 0; i < count; i++){
        if(count === 7){
            if(i === 5){
                continue;
            }
        }
        id.push(`ID-${i}`);
    }
    return id;
}

console.log(generateIDs(7))

//PROBLEM_3
function calculateTotal(...numbers){
    let sum = numbers.reduce((total, current) => total + current, 0)

    return sum;
}

console.log(calculateTotal(1,2,3,4,5,6,7,8,9));


