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