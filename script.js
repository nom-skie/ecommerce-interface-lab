//Define a Product classto present each product in the store
class Product{
    constructor(id, name, price, image){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}


// Array to store product date like id, name, price, and image. This array is used to dynamically generate the product listings 
// on the products page. Each product is represented as an instance of the Product class, which constains properties 
// for the product's ID, name, price, and image URL. This allows for easy management and display of products in the online store.
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

// Select the container where the products will be displayed. The querySelector method is used to select the HTML element with the class "products",
//  which serves as the container for displaying the product listings on the webpage.
const productContainer = document.querySelector(".products");

//This code checks if the productContainer element exists on the page. If it does, it iterates thorough the products array and creates a card for each product.
if (productContainer) {
    //The forEach method is used to loop through each product in the products array.
    products.forEach(product => {
        //The createElement method is used to create new HTML elements for each product, such as an article for the product card, 
        // an image for the product image, a heading for the product name, a paragraph for the price, 
        // and a button for adding the product to the cart.
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

        // Append the created elements to the card and then to the product container. The appendChild method is used to add the created elements to the DOM, 
        // allowing them to be displayed on the webpage. Each product card is constructed with its image, name, price, details link, and add to cart button, 
        // and then added to the main product container for display.
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(wrapper);
        card.appendChild(btn);

        // Append the card to the product container
        productContainer.appendChild(card);

   });
}

// Initialize an empty array to represent the shopping cart
let cart = [];

// Select the cart container and total price element
const cartList = document.querySelector(".cart");

// Select the total price element
const totalPrice = document.querySelector("#Subtotal h3");

// Event listener for adding products to the cart when the "Add to Cart" button is clicked
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains("atc-btn")){
        // Get the product ID from the button's data attribute and find the corresponding product in the products array
        const ItemId = parseInt(e.target.getAttribute('data-id'));
        // The find method is used to search through the products array and return the product object that matches the clicked button's data-id.
        const product = products.find(product => product.id === ItemId);

        // Check if the product is already in the cart. If it is, incvrement the quantity. If not, add the product to the cart with a quantity of 1.
        const existingProduct = cart.find(item => item.Id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        }else {
            cart.push({...product, quantity: 1});
        }

        //Call the renderCart function to update the cart display with the new product and quantity.
        renderCart();
    }
});

//This is the renderCart function, which is responsible for updating the shopping cart display on the webpage. It first checks if the cartList element exists, and if it does, it clears its content.
// Then, it iterates through the cart array and creates list items for each product in the cart, displaying the product image, name, price, and quantity. 
// Finally, it calculates the total price of the items in the cart and updates the total price display.
function renderCart() {

    // Check if the cartList element exists before trying to update it. If it doesn't exist, the function will return early to prevent errors.
    if (!cartList) return;

    // Clear the current cart display before rendering the updated cart. 
    // This ensures that the cart display is refreshed with the latest information each time a product is added or updated.
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


    //The reduce works by iterating through each item in the cart and accumulating the total price. For each item, it multiplies the item's price by its quantity and adds that to the total. 
    // The initial value of total is set to 0, and as the reduce function processes each item in the cart, it updates the total accordingly. Finally, the total price is displayed in the subtotal section of the cart.
    const total = cart.reduce((total, current) => total + (current.price * current.quantity), 0);
    if(totalPrice) {
        totalPrice.textContent = `Subtotal: ₱${total.toLocaleString()}`;
    }
}

// Event listener for updating product quantity in the cart
if (cartList) {
    // Listen for changes in the quantity input fields and update the cart accordingly. When a change event occurs on an input field of type "number", the event listener retrieves the product ID from the data attribute and the new quantity value. 
    // If the new quantity is less than or equal to 0, the product is removed from the cart. Otherwise, the quantity of the corresponding product in the cart is updated. 
    // After making changes to the cart, the render Cart function is called to update the displayed cart items and total price.  
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

// Simulated user data for account page. This object contains the user's name and their order history, which includes details such as order ID, date, 
// total amount, and items purchased.
const currentUser = {
    name: "Mila Jane",
    orderHistory: [{OID: 1, date: "2006-02-23", total: "₱2,003.46", items: ["adidas | Running Anti-wind Fitting Loose Jacket", "Denim Cap"]},
                   {OID: 2, date: "2006-03-15", total: "₱12,490", items: ["Apple AirPods Pro 2"]},
                   {OID: 3, date: "2006-03-26", total: "₱2,495", items: ["BASH Gateway Weekday Backpack"]},
                   {OID: 4, date: "2006-04-07", total: "₱242", items: ["O.TWO.O Face Waterproof Powder"]}]
}

//Personalize the account page with user data
const header = document.querySelector("#account-header");
if (header) {
    header.innerHTML =`
    <h2>Welcome back, ${currentUser.name}!<h2>
    <nav>
        <a href="#">Order History</a>
        <a href="#">Profile Settings</a>
        <a href="#">Wishlist</a>
    </nav>
    `;
}

const orderSummary = document.querySelector("summary");
const details = document.querySelector("details");


// Event listener for displaying order history in the account page
if (orderSummary) {
    orderSummary.addEventListener('click', () => {
        let allOrder = "<summary>Order History</summary";

        currentUser.orderHistory.forEach(order => {
            allOrder +=`
                <p>Date: ${order.date}</p>
                <p>Total: ${order.total}</p>
                <p>Items: ${order.items.join(", ")}</p>
                <p>---------------------------</p>
            `;
        })
                
        details.innerHTML = allOrder;

    });                    

}

const checkoutForm = document.querySelector(".checkout");

// Event listener for validating checkout form and redirecting to thank you p[age
if (checkoutForm) {
    checkoutForm.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON") {
            e.preventDefault();
            const name = document.querySelector("#name");
            const street = document.querySelector("#street");
            const zip = document.querySelector("#zip-code");

            let valid = true;

            const inputs = [name, street, zip];

            // Validate the checkout form by checking if the required fields are filled. 
            // The code iterates through the input fields and checks if any of them are empty.
            inputs.forEach(input => {
                // Remove any existing error class from the input field and check if the value is empty. If it is, add an error 
                // class to highlight the field and set a placeholder text indicating that the field is required.
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

// Event listener for adding fade-in animation when a product is added to the cart
document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains("atc-btn")) {
        const card = e.target.closest('article');

        card.classList.add("fade-in");
        setTimeout(() => {
            card.classList.remove("fade-in");
        }, 400);
    }
});