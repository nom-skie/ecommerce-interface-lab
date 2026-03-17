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

