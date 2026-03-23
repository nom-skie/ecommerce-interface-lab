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
