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
                    ₹${Number(product.price).toLocaleString("en-IN")}
                    × ${cartItem.quantity}
                </p>
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

    const clearCartButton = document.querySelector("#clearCart");

    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("darveCart");

        renderCart();
    });
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
