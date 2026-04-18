//Define a Product classto present each product in the store
class Product{
    constructor(id, name, price, image){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}


const products = [
    new Product (1, "Apple Airpods Pro 2", 12490.00, "images/Apple AirPods Pro 2.jpg"),
    new Product (2, "Air Max 270 React", 10295.00, "images/Air Max 270 React.jpg"),
    new Product (3, "Automatic Umbrella", 139.00, "images/FK101 Automatic Umbrella.png"),
    new Product (4, "ASUS TUF Gaming A16", 88999.00, "images/laptop.png"),
    new Product (5, "NIVEA Body Lotion", 172.00, "images/Nivea.jpg"),
    new Product (6, "DEnim Cap", 133.00, "images/Denim Cap with NEW YORK Embroidered Design.png"),
    new Product (7, "Trolley Cart Organizer", 224.00, "images/trolly.png"),
    new Product (8, "26 in 1 Wire Stripper Electrician Hand Tool", 155.00, "images/26 in 1 Wire Stripper Electrician Hand Tool.png"),
    new Product (9, "BAVIN PC091 20000mAh Power Bank", 336.41, "images/powerbank.png"),
    new Product (10, "adidas | Running Anti-Wind Fitting Loose Jacket", 1870.46, "images/jacket.png"),
    new Product (11, "BASH Gateway Weekday Backpack", 2495.00, "images/bag.png"),
    new Product (12, "O.TWO>O Face Waterproof Powder", 242.00, "images/face powder.png")
]

const productContainer = document.querySelector(".products");

if (productContainer) {
    products.forEach(product => {
        const card = document.createElement('article');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;

        const title = document.createElement('h3');
        const titleText = document.createTextNode(product.name);
        title.appendChild(titleText);

        const price = document.createElement('p');
        const priceText = document.createTextNode(product.price.toLocaleString());
        price.appendChild(priceText);
        price.classList.add("price");

        const wrapper = document.createElement('p');
        const details = document.createElement('a');
        details.href = "detail.html";
        details.textContent = "View Details";
        wrapper.appendChild(details);

        const btn = document.createElement('button');
        const btnText = document.createTextNode("Add to Cart");
        btn.appendChild(btnText);
        btn.setAttribute('data-id', product.id);
        btn.classList.add("atc-btn");

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(wrapper);
        card.appendChild(btn);

        productContainer.appendChild(card);

   });
}

let cart = [];

const cartList = document.querySelector(".cart");

const totalPrice = document.querySelector("#Subtotal h3");

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains("atc-btn")){
        const ItemId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(product => product.id === ItemId);

        const existingProduct = cart.find(item => item.Id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        }else {
            cart.push({...product, quantity: 1});
        }

        renderCart();
    }
});

function renderCart() {

    if (!cartList) return;
    cartList.textContent = "";

    cart.forEach(product => {
        const listItem = document.createElement('li');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;

        const title = document.createElement('h3');
        const titleText = document.createTextNode(product.name);
        title.appendChild(titleText);

        const price = document.createElement('p');
        const priceText = document.createTextNode(product.price.toLocaleString());
        price.appendChild(priceText);
        price.classList.add("price");

        const quantity = document.createElement('input');
        quantity.type = "number";
        quantity.value = product.quantity;
        quantity.min = 0;
        quantity.setAttribute('data-id', product.id);


        cartList.appendChild(listItem);
        listItem.appendChild(image);
        listItem.appendChild(title);
        listItem.appendChild(price);
        listItem.appendChild(quantity);
    });

    const total = cart.reduce((total, current) => total + (current.price * current.quantity), 0);
    if(totalPrice) {
        totalPrice.textContent = `Subtotal: ₱${total.toLocaleString()}`;
    }
}


if (cartList) {
    cartList.addEventListener('change', (e) => {
        if(e.target.type === "number") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const newQty = parseInt(e.target.value);

            if(newQty <= 0) {
                cart = cart.filter(item => item.id !== productId);
            }else {
                const product = cart.find(item => item.id === productId);
                if(product) {
                    product.quantity = newQty;
                }
            }
            renderCart();
        }
    });
    
}


const checkoutForm = document.querySelector(".checkout");

if (checkoutForm) {
    checkoutForm.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON") {
            e.preventDefault();
            const name = document.querySelector("#name");
            const street = document.querySelector("#street");
            const zip = document.querySelector("#zip-code");

            let valid = true;

            const inputs = [name, street, zip];

            inputs.forEach(input => {
                input.classList.remove("error");
                if(input.value.trim() === "") {
                    input.classList.add("error");
                    input.placeholder = "This field is required";
                    valid = false;
                }
            });

            if(valid) {
                window.location.href = "thankyou.html";
            }
        }
    });
}

document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains("atc-btn")) {
        const card = e.target.closest('article');

        card.classList.add("fade-in");
        setTimeout(() => {
            card.classList.remove("fade-in");
        }, 400);
    }
});