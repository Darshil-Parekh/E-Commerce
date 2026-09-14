let products = [];
let editingProductId = null;

const productForm = document.querySelector("#productForm");
const productIdInput = document.querySelector("#productId");
const productNameInput = document.querySelector("#productName");
const productCategoryInput = document.querySelector("#productCategory");
const productPriceInput = document.querySelector("#productPrice");
const productImageInput = document.querySelector("#productImage");
const productDescriptionInput = document.querySelector("#productDescription");

const adminProductList = document.querySelector("#adminProductList");
const adminFilter = document.querySelector("#adminFilter");

const productCount = document.querySelector("#productCount");
const adminMessage = document.querySelector("#adminMessage");

const formTitle = document.querySelector("#formTitle");
const saveProductButton = document.querySelector("#saveProductButton");

const clearFormButton = document.querySelector("#clearForm");
const cancelEditButton = document.querySelector("#cancelEdit");

async function loadProducts() {
    try {
        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Could not load products.json");
        }

        const jsonProducts = await response.json();

        const savedProducts = localStorage.getItem("darveProducts");

        if (savedProducts) {
            products = JSON.parse(savedProducts);
        } else {
            products = jsonProducts;
        }

        renderAdminProducts();

    } catch (error) {
        console.error(error);

        showMessage(
            "Products could not be loaded. Run the project using Live Server.",
            "error"
        );
    }
}

function saveProducts() {
    localStorage.setItem(
        "darveProducts",
        JSON.stringify(products)
    );
}

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (editingProductId !== null) {
        updateProduct();
    } else {
        addProduct();
    }
});

function addProduct() {
    const product = getProductFromForm();

    product.id = getNextProductId();

    products.push(product);

    saveProducts();
    renderAdminProducts();
    clearForm();

    showMessage(
        "Product added successfully.",
        "success"
    );
}

function updateProduct() {
    const productIndex = products.findIndex(function (product) {
        return product.id === editingProductId;
    });

    if (productIndex === -1) {
        return;
    }

    const updatedProduct = getProductFromForm();

    updatedProduct.id = editingProductId;

    products[productIndex] = updatedProduct;

    saveProducts();
    renderAdminProducts();
    clearForm();

    showMessage(
        "Product updated successfully.",
        "success"
    );
}

function deleteProduct(productId) {
    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const shouldDelete = confirm(
        `Are you sure you want to delete "${product.name}"?`
    );

    if (!shouldDelete) {
        return;
    }

    products = products.filter(function (item) {
        return item.id !== productId;
    });

    saveProducts();
    renderAdminProducts();

    if (editingProductId === productId) {
        clearForm();
    }

    showMessage(
        "Product deleted successfully.",
        "success"
    );
}

function editProduct(productId) {
    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    editingProductId = productId;

    productIdInput.value = product.id;
    productNameInput.value = product.name;
    productCategoryInput.value = product.category;
    productPriceInput.value = product.price;
    productImageInput.value = product.image;
    productDescriptionInput.value = product.description;

    formTitle.textContent = "Edit Product";
    saveProductButton.textContent = "Update Product";

    cancelEditButton.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function getProductFromForm() {
    const category = productCategoryInput.value;

    return {
        name: productNameInput.value.trim(),
        category: category,
        categoryLabel: getCategoryLabel(category),
        price: Number(productPriceInput.value),
        image: productImageInput.value.trim(),
        description: productDescriptionInput.value.trim()
    };
}

function getCategoryLabel(category) {
    const labels = {
        watch: "WATCHES",
        perfume: "FRAGRANCES",
        belt: "BELTS",
        bag: "BAGS"
    };

    return labels[category] || category.toUpperCase();
}

function getNextProductId() {
    if (products.length === 0) {
        return 1;
    }

    const ids = products.map(function (product) {
        return Number(product.id);
    });

    return Math.max(...ids) + 1;
}

function renderAdminProducts() {
    const selectedCategory = adminFilter.value;

    let visibleProducts = products;

    if (selectedCategory !== "all") {
        visibleProducts = products.filter(function (product) {
            return product.category === selectedCategory;
        });
    }

    productCount.textContent = products.length;

    if (visibleProducts.length === 0) {
        adminProductList.innerHTML = `
            <div class="empty-products">
                No products found.
            </div>
        `;

        return;
    }

    adminProductList.innerHTML = "";

    visibleProducts.forEach(function (product) {
        const item = document.createElement("article");

        item.className = "admin-product-card";

        item.innerHTML = `
            <div class="admin-product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}">
            </div>

            <div class="admin-product-details">

                <span>
                    ${product.categoryLabel}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <strong>
                    ₹${Number(product.price).toLocaleString("en-IN")}
                </strong>

            </div>

            <div class="admin-product-actions">

                <button
                    class="edit-button"
                    data-edit-id="${product.id}">
                    Edit
                </button>

                <button
                    class="delete-button"
                    data-delete-id="${product.id}">
                    Delete
                </button>

            </div>
        `;

        adminProductList.appendChild(item);
    });

    attachAdminButtons();
}

function attachAdminButtons() {
    const editButtons = document.querySelectorAll("[data-edit-id]");
    const deleteButtons = document.querySelectorAll("[data-delete-id]");

    editButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId = Number(button.dataset.editId);

            editProduct(productId);
        });
    });

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId = Number(button.dataset.deleteId);

            deleteProduct(productId);
        });
    });
}

function clearForm() {
    productForm.reset();

    productIdInput.value = "";

    editingProductId = null;

    formTitle.textContent = "Add Product";
    saveProductButton.textContent = "Add Product";

    cancelEditButton.classList.add("hidden");
}

function showMessage(message, type) {
    adminMessage.textContent = message;

    adminMessage.className = `admin-message ${type}`;

    setTimeout(function () {
        adminMessage.textContent = "";
        adminMessage.className = "admin-message";
    }, 3000);
}

adminFilter.addEventListener("change", function () {
    renderAdminProducts();
});

clearFormButton.addEventListener("click", function () {
    clearForm();
});

cancelEditButton.addEventListener("click", function () {
    clearForm();
});

loadProducts();
