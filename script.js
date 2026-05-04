// Base URL for the backend API
const BASE_URL = "http://localhost:8080/api/v1";

/**
 * Fetches all products from the backend API using async/await.
 * Replaces the old static products array with live data from the database.
 * Handles errors manually by checking response.ok since fetch() only rejects
 * on network failure, not on HTTP error statuses like 404 or 500.
 */
async function fetchProducts() {
  // Select the product container — works for both products.html and landing.html
  const productContainer =
    document.querySelector("#main-products") ||
    document.querySelector(".products");

  // If no product container exists on this page, exit early
  if (!productContainer) return;

  try {
    const response = await fetch(`${BASE_URL}/products`);

    // Manually check if the HTTP response status is in the 200-299 range.
    // fetch() does NOT reject on 404 or 500, so we must check this ourselves.
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Products not found (404)");
      } else if (response.status === 500) {
        throw new Error("Server error (500)");
      } else {
        throw new Error(`Http error! Status: ${response.status}`);
      }
    }

    // Parse the JSON response body into a JavaScript array
    const products = await response.json();

    // Handle empty state — if no products exist yet, show a message
    if (products.length === 0) {
      productContainer.innerHTML = `<p style="text-align:center;">No products available.</p>`;
      return;
    }

    // Render the fetched products into the container
    renderProducts(products, productContainer);
  } catch (error) {
    // Log the error to the console for debugging and show a message on the page
    console.error("Error fetching products: ", error.message);
    productContainer.innerHTML = `<p style="color:red;">Failed to load products: ${error.message}</p>`;
  }
}

/**
 * Dynamically renders product cards into the given container.
 * Called by fetchProducts() after a successful API response.
 *
 * @param {Array} products - the list of product objects returned by the API
 * @param {HTMLElement} productContainer - the DOM element to render cards into
 */
function renderProducts(products, productContainer) {
  // Clear any existing content before rendering
  productContainer.textContent = "";

  // Loop through each product and create a card for it
  products.forEach((product) => {
    const card = document.createElement("article");

    // Product image — uses imageUrl from the API response
    const image = document.createElement("img");
    image.src = product.imageUrl || "images/placeholder.png";
    image.alt = product.name;

    //Product name
    const title = document.createElement("h3");
    const titleText = document.createTextNode(product.name);
    title.appendChild(titleText);

    // Product price with peso sign via CSS .price class
    const price = document.createElement("p");
    const priceText = document.createTextNode(product.price.toLocaleString());
    price.appendChild(priceText);
    price.classList.add("price");

    // View Details link
    const wrapper = document.createElement("p");
    const details = document.createElement("a");
    details.href = "detail.html";
    details.textContent = "View Details";
    wrapper.appendChild(details);

    // Add to Cart button
    // Store product data as data-* attributes so the cart listener
    // can read them without needing a local products array
    const btn = document.createElement("button");
    const btnText = document.createTextNode("Add to Cart");
    btn.appendChild(btnText);
    btn.setAttribute("data-id", product.id);
    btn.setAttribute("data-name", product.name);
    btn.setAttribute("data-price", product.price);
    btn.setAttribute(
      "data-image",
      product.imageUrl || "images/placeholder.png",
    );
    btn.classList.add("atc-btn");

    // Append all elements to the card, then the card to the container
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(wrapper);
    card.appendChild(btn);
    productContainer.appendChild(card);
  });
}

// Call fetchProducts on page load to populate the product grid dynamically
fetchProducts();

// ===========================
// CART
// ===========================

// Initialize an empty array to represent the shopping cart
let cart = [];

// Select the cart container and subtotal display element
const cartList = document.querySelector(".cart");
const totalPrice = document.querySelector("#Subtotal h3");

/**
 * Event listener for the Add to Cart button.
 * Reads product data from the button's data-* attributes
 * instead of looking up from a local array.
 */
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("atc-btn")) {
    // Read product info from the button's data attributes
    const itemId = parseInt(e.target.getAttribute("data-id"));
    const name = e.target.getAttribute("data-name");
    const price = parseFloat(e.target.getAttribute("data-price"));
    const image = e.target.getAttribute("data-image");

    // If the product is already in the cart, increment its quantity
    // Otherwise, add it as a new item with quantity 1
    const existingProduct = cart.find((item) => item.id === itemId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id: itemId, name, price, image, quantity: 1 });
    }

    // Re-render the cart to reflect the updated state
    renderCart();
  }
});

/**
 * Renders the current cart state into the cart container.
 * Clears the existing display and rebuilds it from the cart array.
 * Also recalculates and updates the subtotal.
 */
function renderCart() {
  // Exit early if the cart container doesn't exist on this page
  if (!cartList) return;

  // Clear the current cart display before re-rendering
  cartList.textContent = "";

  cart.forEach((product) => {
    const listItem = document.createElement("li");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    const title = document.createElement("h3");
    const titleText = document.createTextNode(product.name);
    title.appendChild(titleText);

    const price = document.createElement("p");
    const priceText = document.createTextNode(product.price.toLocaleString());
    price.appendChild(priceText);
    price.classList.add("price");

    // Quantity input — allows the user to update or remove items
    const quantity = document.createElement("input");
    quantity.type = "number";
    quantity.value = product.quantity;
    quantity.min = 0;
    quantity.setAttribute("data-id", product.id);

    // Append children to listItem first, then listItem to cartList
    listItem.appendChild(image);
    listItem.appendChild(title);
    listItem.appendChild(price);
    listItem.appendChild(quantity);
    cartList.appendChild(listItem);
  });

  // Calculate the total price using reduce — multiplies price by quantity for each item
  const total = cart.reduce(
    (total, current) => total + current.price * current.quantity,
    0,
  );

  // Update the subtotal display if it exists
  if (totalPrice) {
    totalPrice.textContent = `Subtotal: ₱${total.toLocaleString()}`;
  }
}

/**
 * Event listener for quantity input changes in the cart.
 * Updates the quantity of an item or removes it if set to 0 or below.
 */
if (cartList) {
  cartList.addEventListener("change", (e) => {
    if (e.target.type === "number") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const newQty = parseInt(e.target.value);

      // Remove the item from the cart if quantity is 0 or negative
      if (newQty <= 0) {
        cart = cart.filter((item) => item.id !== productId);
      } else {
        const product = cart.find((item) => item.id === productId);
        if (product) {
          product.quantity = newQty;
        }
      }
      renderCart();
    }
  });
}

// ===========================
// ACCOUNT
// ===========================

// Simulated user data for the account page
const currentUser = {
  name: "Mila Jane",
  orderHistory: [
    {
      OID: 1,
      date: "2026-02-23",
      total: "₱2,003.46",
      items: ["adidas | Running Anti-wind Fitting Loose Jacket", "Denim Cap"],
    },
    {
      OID: 2,
      date: "2026-03-15",
      total: "₱12,490",
      items: ["Apple AirPods Pro 2"],
    },
    {
      OID: 3,
      date: "2026-03-26",
      total: "₱2,495",
      items: ["BASH Gateway Weekday Backpack"],
    },
    {
      OID: 4,
      date: "2026-04-07",
      total: "₱242",
      items: ["O.TWO.O Face Waterproof Powder"],
    },
  ],
};

//Personalize the account page with user data
const header = document.querySelector("#account-header");
if (header) {
  header.innerHTML = `
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
  orderSummary.addEventListener("click", () => {
    let allOrder = "<summary>Order History</summary";

    currentUser.orderHistory.forEach((order) => {
      allOrder += `
                <p>Date: ${order.date}</p>
                <p>Total: ${order.total}</p>
                <p>Items: ${order.items.join(", ")}</p>
                <p>---------------------------</p>
            `;
    });

    details.innerHTML = allOrder;
  });
}

// ===========================
// CHECKOUT
// ===========================

const checkoutForm = document.querySelector(".checkout");

// Event listener for validating checkout form and redirecting to thank you p[age
if (checkoutForm) {
  checkoutForm.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
      const name = document.querySelector("#name");
      const street = document.querySelector("#street");
      const zip = document.querySelector("#zip-code");

      let valid = true;

      const inputs = [name, street, zip];

      // Validate each required field — highlight empty ones with an error class
      inputs.forEach((input) => {
        input.classList.remove("error");
        if (input.value.trim() === "") {
          input.classList.add("error");
          input.placeholder = "This field is required";
          valid = false;
        }
      });

      // Redirect to thank you page only if all fields are filled
      if (valid) {
        window.location.href = "thankyou.html";
      }
    }
  });
}

// ===========================
// ANIMATIONS
// ===========================

// Event listener for adding fade-in animation when a product is added to the cart
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("atc-btn")) {
    const card = e.target.closest("article");

    card.classList.add("fade-in");
    setTimeout(() => {
      card.classList.remove("fade-in");
    }, 400);
  }
});
