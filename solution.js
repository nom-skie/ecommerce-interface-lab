// Problem 2

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

console.log(generateIDs(7));
