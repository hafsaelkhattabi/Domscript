
// Cart Data
var cart = [];

// DOM Elements
var cartItems = document.getElementById("cart-items");
var cartTotalElement = document.getElementById("cart-total");
var cartQuantityElement = document.getElementById("cart-quantity");
var totalProductsElement = document.getElementById("total-products");

// Add Product to Cart
function addToCart(productName, productPrice, productImage) {
    var productInCart = findProductInCart(productName);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        var newProduct = {
            name: productName,
            price: productPrice,
            img: productImage,
            quantity: 1
        };
        cart.push(newProduct);
    }

    updateCart();
}

// Find Product in Cart
function findProductInCart(productName) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            return cart[i];
        }
    }
    return null;
}

// Update Cart
function updateCart() {
    cartItems.innerHTML = "";
    var total = 0;
    var totalQuantity = 0;

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        total += item.price * item.quantity;
        totalQuantity += item.quantity;

        var li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
            </div>
            <div>
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
        `;
        cartItems.appendChild(li);
    }

    cartTotalElement.textContent = "Total: $" + total.toFixed(2);
    cartQuantityElement.textContent = "Items in Cart: " + totalQuantity;
    totalProductsElement.textContent = "Total Products: " + cart.length;
}

// Change Product Quantity (Increment/Decrement)
function changeQuantity(productName, change) {
    var productInCart = findProductInCart(productName);

    if (productInCart) {
        productInCart.quantity += change;

        if (productInCart.quantity <= 0) {
            removeProductFromCart(productName);
        }

        updateCart();
    }
}

// Remove Product from Cart
function removeProductFromCart(productName) {
    cart = cart.filter(function(item) {
        return item.name !== productName;
    });
}

// Show Cart (Sidebar)
function showCart() {
    document.querySelector(".cart-sidebar").style.right = "0";
}

// Hide Cart (Sidebar)
function hideCart() {
    document.querySelector(".cart-sidebar").style.right = "-300px";
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCart();
}

// Attach Event Listeners to "Shop Now" Buttons
var shopNowButtons = document.querySelectorAll(".btn-secondary");
for (var i = 0; i < shopNowButtons.length; i++) {
    shopNowButtons[i].addEventListener("click", function() {
        var productName = this.getAttribute("data-name");
        var productPrice = parseFloat(this.getAttribute("data-price"));
        var productImg = this.getAttribute("data-img");

        addToCart(productName, productPrice, productImg);
    });
}

// Show and Hide Cart Sidebar
document.getElementById("header").addEventListener("click", showCart);
document.getElementById("sidebar").addEventListener("click", hideCart);
document.getElementById("clear-cart").addEventListener("click", clearCart);
