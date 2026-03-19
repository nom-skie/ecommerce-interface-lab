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