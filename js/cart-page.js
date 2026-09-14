let allProducts = [];

const cartItemsContainer = document.querySelector("#cartItems");
const cartTotalContainer = document.querySelector("#cartTotal");

async function loadCartPage() {
    const response = await fetch("products.json");

    const jsonProducts = await response.json();

    const savedProducts = localStorage.getItem("darveProducts");

    if (savedProducts) {
        allProducts = JSON.parse(savedProducts);
    } else {
        allProducts = jsonProducts;
    }

    renderCart();
}

function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-products">
                Your cart is empty.
            </div>
        `;

        cartTotalContainer.textContent = "";
        updateCartCount();

        return;
    }

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach(function (cartItem) {
        const product = allProducts.find(function (item) {
            return Number(item.id) === Number(cartItem.productId);
        });

        if (!product) {
            return;
        }

        const itemTotal = product.price * cartItem.quantity;

        total += itemTotal;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <div>
                <h3>
                    ${product.name}
                </h3>

                <p>
                    ₹${Number(product.price).toLocaleString("en-IN")} each
                </p>
            </div>

            <div class="quantity-control" aria-label="Quantity for ${product.name}">
                <button
                    type="button"
                    class="quantity-button"
                    data-quantity-id="${product.id}"
                    data-quantity-change="-1"
                    aria-label="Decrease ${product.name} quantity">
                    −
                </button>
                <span>${cartItem.quantity}</span>
                <button
                    type="button"
                    class="quantity-button"
                    data-quantity-id="${product.id}"
                    data-quantity-change="1"
                    aria-label="Increase ${product.name} quantity">
                    +
                </button>
            </div>

            <strong>
                ₹${Number(itemTotal).toLocaleString("en-IN")}
            </strong>

            <button
                class="delete-button"
                data-remove-id="${product.id}">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalContainer.innerHTML = `
        <span>
            Total
        </span>

        <strong>
            ₹${Number(total).toLocaleString("en-IN")}
        </strong>

        <button
            id="clearCart"
            class="secondary-button">
            Clear Cart
        </button>
    `;

    updateCartCount();
    attachCartPageEvents();
}

function attachCartPageEvents() {
    const removeButtons = document.querySelectorAll("[data-remove-id]");

    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId = Number(button.dataset.removeId);

            removeFromCart(productId);
        });
    });

    const quantityButtons = document.querySelectorAll("[data-quantity-change]");

    quantityButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            changeQuantity(
                Number(button.dataset.quantityId),
                Number(button.dataset.quantityChange)
            );
        });
    });

    const clearCartButton = document.querySelector("#clearCart");

    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("darveCart");

        renderCart();
    });
}

function changeQuantity(productId, amount) {
    let cart = getCart();
    const cartItem = cart.find(function (item) {
        return Number(item.productId) === productId;
    });

    if (!cartItem) {
        return;
    }

    cartItem.quantity += amount;

    if (cartItem.quantity <= 0) {
        cart = cart.filter(function (item) {
            return Number(item.productId) !== productId;
        });
    }

    saveCart(cart);
    renderCart();
}

function removeFromCart(productId) {
    let cart = getCart();

    cart = cart.filter(function (item) {
        return Number(item.productId) !== productId;
    });

    saveCart(cart);

    renderCart();
}

loadCartPage();
