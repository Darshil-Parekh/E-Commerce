function getCart() {
    const savedCart = localStorage.getItem("darveCart");

    if (!savedCart) {
        return [];
    }

    return JSON.parse(savedCart);
}

function saveCart(cart) {
    localStorage.setItem("darveCart", JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();

    const existingProduct = cart.find(function (item) {
        return item.productId === productId;
    });

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    alert("Product added to cart.");
}

function updateCartCount() {
    const cartCount = document.querySelector("#cartCount");

    if (!cartCount) {
        return;
    }

    const cart = getCart();

    const totalItems = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}

updateCartCount();
