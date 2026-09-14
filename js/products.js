let products = [];
let selectedCategory = "all";

const productGrid = document.querySelector("#productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

async function loadProducts() {
    try {
        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Products could not be loaded.");
        }

        const jsonProducts = await response.json();

        /*
         * The admin panel stores changes in localStorage.
         * We use those changes first when they exist.
         */
        const savedProducts = localStorage.getItem("darveProducts");

        if (savedProducts) {
            products = JSON.parse(savedProducts);
        } else {
            products = jsonProducts;
        }

        renderProducts();
    } catch (error) {
        console.error(error);

        productGrid.innerHTML = `
            <p class="product-message">
                Products could not be loaded.
            </p>
        `;
    }
}

function renderProducts() {
    let filteredProducts = products;

    if (selectedCategory !== "all") {
        filteredProducts = products.filter(function (product) {
            return product.category === selectedCategory;
        });
    }

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <p class="product-message">
                No products found in this category.
            </p>
        `;

        return;
    }

    productGrid.innerHTML = "";

    filteredProducts.forEach(function (product) {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}">
            </div>

            <div class="product-info">
                <span class="product-category">
                    ${product.categoryLabel}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">
                    <span class="product-price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <button
                        class="add-cart"
                        data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });

    attachCartButtons();
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        renderProducts();
    });
});

function attachCartButtons() {
    const buttons = document.querySelectorAll(".add-cart");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId = Number(button.dataset.productId);

            addToCart(productId);
        });
    });
}

loadProducts();
