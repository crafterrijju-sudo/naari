/* =========================================
   NAARI - MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   SETTINGS
   ========================================= */

// Apna WhatsApp number sirf apne VS Code mein add karein.
// Example: 919876543210
const whatsappNumber = "7841833086";


// Apni UPI ID sirf apne VS Code mein add karein.
// Example: yourname@upi
const upiId = "rijavanatamboli02@oksbi";


// Fixed shipping
const shippingCharge = 50;


/* =========================================
   PRODUCTS
   ========================================= */

const products = [

    {
        id: 1,

        name: "Handmade Earrings",

        category: "Earrings",

        price: 199,

        image: "images/earrings.jpg.jpeg",

        description:
            "Beautiful handmade earrings crafted with care. Perfect for everyday wear and special occasions."
    },


    {
        id: 2,

        name: "Handmade Bracelet",

        category: "Bracelets",

        price: 179,

        image: "images/bracelet.jpg.jpeg",

        description:
            "Elegant handmade bracelet designed to add a simple and beautiful touch to your look."
    },


    {
        id: 3,

        name: "Handmade Bangles",

        category: "Bangles",

        price: 249,

        image: "images/bangles.jpg.jpeg",

        description:
            "Beautiful handmade bangles created with love and attention to detail."
    },


    {
        id: 4,

        name: "Navratri Jewellery",

        category: "Navratri",

        price: 299,

        image: "images/navratri.jpg.jpeg",

        description:
            "Festive handmade jewellery perfect for Navratri celebrations and traditional outfits."
    },


    {
        id: 5,

        name: "Hair Accessories",

        category: "Hair Accessories",

        price: 199,

        image: "images/hair-accessories.jpg.jpeg",

        description:
            "Cute handmade hair accessories designed to make your everyday hairstyle more beautiful."
    }

];


/* =========================================
   CART
   ========================================= */

let cart = [];


/* =========================================
   DISPLAY PRODUCTS
   ========================================= */

function displayProducts(productList = products) {

    const productGrid =
        document.getElementById("product-grid");


    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = "";


    if (productList.length === 0) {

        productGrid.innerHTML = `
            <div class="no-products">

                <h3>
                    No products found
                </h3>

                <p>
                    Try another search.
                </p>

            </div>
        `;

        return;
    }


    productList.forEach(function(product) {

        const productCard =
            document.createElement("div");


        productCard.className =
            "product-card";


        productCard.innerHTML = `

            <div
                class="product-image"
                onclick="openProductDetails(${product.id})"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div
                class="product-card-content"
                onclick="openProductDetails(${product.id})"
            >

                <p class="product-category">
                    ${product.category}
                </p>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-price">
                    ₹${product.price}
                </p>

            </div>


            <button
                class="add-cart-btn"
                onclick="
                    event.stopPropagation();
                    addToCart(${product.id});
                "
            >
                Add to Cart
            </button>

        `;


        productGrid.appendChild(productCard);

    });

}


/* =========================================
   PRODUCT DETAILS
   ========================================= */

function openProductDetails(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    const modal =
        document.getElementById("product-modal");

    const image =
        document.getElementById("modal-product-image");

    const category =
        document.getElementById("modal-product-category");

    const name =
        document.getElementById("modal-product-name");

    const price =
        document.getElementById("modal-product-price");

    const description =
        document.getElementById("modal-product-description");

    const addButton =
        document.getElementById("modal-add-cart");


    image.src =
        product.image;


    image.alt =
        product.name;


    category.textContent =
        product.category;


    name.textContent =
        product.name;


    price.textContent =
        `₹${product.price}`;


    description.textContent =
        product.description;


    addButton.onclick =
        function() {

            addToCart(product.id);

            closeProductDetails();

        };


    modal.classList.add("show");


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================
   CLOSE PRODUCT DETAILS
   ========================================= */

function closeProductDetails(event) {

    if (
        event &&
        event.target &&
        event.target.id !== "product-modal"
    ) {
        return;
    }


    const modal =
        document.getElementById("product-modal");


    if (!modal) {
        return;
    }


    modal.classList.remove("show");


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================
   ADD TO CART
   ========================================= */

function addToCart(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    updateCartCount();

    displayCart();


    showNotification(
        "Product added to cart"
    );

}


/* =========================================
   REMOVE FROM CART
   ========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;

        });


    updateCartCount();

    displayCart();

}


/* =========================================
   CHANGE QUANTITY
   ========================================= */

function changeQuantity(productId, change) {

    const item =
        cart.find(function(product) {

            return product.id === productId;

        });


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    updateCartCount();

    displayCart();

}


/* =========================================
   CART COUNT
   ========================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (!cartCount) {
        return;
    }


    const totalQuantity =
        cart.reduce(function(total, item) {

            return total + item.quantity;

        }, 0);


    cartCount.textContent =
        totalQuantity;

}


/* =========================================
   CALCULATE TOTAL
   ========================================= */

function calculateCartTotals() {

    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal +=
            item.price * item.quantity;

    });


    const shipping =
        cart.length > 0
            ? shippingCharge
            : 0;


    const total =
        subtotal + shipping;


    return {
        subtotal,
        shipping,
        total
    };

}


/* =========================================
   DISPLAY CART
   ========================================= */

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const shippingElement =
        document.getElementById("cart-shipping");

    const totalElement =
        document.getElementById("cart-total");


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something beautiful to your cart.
                </p>

            </div>

        `;


        subtotalElement.textContent =
            "₹0";


        shippingElement.textContent =
            "₹0";


        totalElement.textContent =
            "₹0";


        return;
    }


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>


                <p>
                    ₹${item.price}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <div class="cart-item-right">

                <strong>
                    ₹${itemTotal}
                </strong>


                <button
                    class="remove-item-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    const totals =
        calculateCartTotals();


    subtotalElement.textContent =
        `₹${totals.subtotal}`;


    shippingElement.textContent =
        `₹${totals.shipping}`;


    totalElement.textContent =
        `₹${totals.total}`;


    updateUPIDisplay();

}


/* =========================================
   UPDATE UPI DISPLAY
   ========================================= */

function updateUPIDisplay() {

    const upiDisplay =
        document.getElementById("upi-display");


    if (!upiDisplay) {
        return;
    }


    upiDisplay.textContent =
        upiId;

}


/* =========================================
   OPEN CART
   ========================================= */

function openCart() {

    const overlay =
        document.getElementById("cart-overlay");


    if (!overlay) {
        return;
    }


    displayCart();


    updateUPIDisplay();


    overlay.classList.add("show");


    document.body.classList.add(
        "cart-open"
    );

}


/* =========================================
   CLOSE CART
   ========================================= */

function closeCart(event) {

    if (
        event &&
        event.target &&
        event.target.id !== "cart-overlay"
    ) {
        return;
    }


    const overlay =
        document.getElementById("cart-overlay");


    if (!overlay) {
        return;
    }


    overlay.classList.remove("show");


    document.body.classList.remove(
        "cart-open"
    );

}


/* =========================================
   FILTER PRODUCTS
   ========================================= */

function filterProducts(category) {

    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(function(button) {

        button.classList.remove("active");


        if (
            button.textContent.trim() ===
            category
        ) {

            button.classList.add("active");

        }

    });


    if (category === "All") {

        displayProducts(products);

        return;

    }


    const filteredProducts =
        products.filter(function(product) {

            return product.category === category;

        });


    displayProducts(filteredProducts);

}


/* =========================================
   SEARCH
   ========================================= */

function setupSearch() {

    const searchInput =
        document.getElementById(
            "product-search"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            if (searchText === "") {

                displayProducts(products);

                return;

            }


            const filteredProducts =
                products.filter(function(product) {

                    return (

                        product.name
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        product.category
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        product.description
                            .toLowerCase()
                            .includes(searchText)

                    );

                });


            displayProducts(
                filteredProducts
            );

        }
    );

}


/* =========================================
   CUSTOMER DETAILS
   ========================================= */

function getCustomerDetails() {

    const nameInput =
        document.getElementById(
            "customer-name"
        );


    const phoneInput =
        document.getElementById(
            "customer-phone"
        );


    const addressInput =
        document.getElementById(
            "customer-address"
        );


    const pincodeInput =
        document.getElementById(
            "customer-pincode"
        );


    return {

        name:
            nameInput
                ? nameInput.value.trim()
                : "",


        phone:
            phoneInput
                ? phoneInput.value.trim()
                : "",


        address:
            addressInput
                ? addressInput.value.trim()
                : "",


        pincode:
            pincodeInput
                ? pincodeInput.value.trim()
                : ""

    };

}


/* =========================================
   VALIDATE CUSTOMER DETAILS
   ========================================= */

function validateCustomerDetails(
    customer
) {

    if (!customer.name) {

        showNotification(
            "Please enter your name"
        );

        return false;

    }


    if (
        !/^[0-9]{10}$/.test(
            customer.phone
        )
    ) {

        showNotification(
            "Please enter a valid 10 digit mobile number"
        );

        return false;

    }


    if (!customer.address) {

        showNotification(
            "Please enter your delivery address"
        );

        return false;

    }


    if (
        !/^[0-9]{6}$/.test(
            customer.pincode
        )
    ) {

        showNotification(
            "Please enter a valid 6 digit pincode"
        );

        return false;

    }


    return true;

}


/* =========================================
   SEND WHATSAPP ORDER
   ========================================= */

function sendWhatsAppOrder() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty"
        );

        return;

    }


    const customer =
        getCustomerDetails();


    if (
        !validateCustomerDetails(
            customer
        )
    ) {

        return;

    }


    if (
        whatsappNumber ===
        "YOUR_WHATSAPP_NUMBER"
    ) {

        showNotification(
            "Please add your WhatsApp number in script.js"
        );

        return;

    }


    if (
        upiId ===
        "YOUR_UPI_ID"
    ) {

        showNotification(
            "Please add your UPI ID in script.js"
        );

        return;

    }


    const totals =
        calculateCartTotals();


    let message = "";


    /* HEADER */

    message +=
        "NAARI - NEW ORDER\n";

    message +=
        "By Women, For Women\n";

    message +=
        "--------------------------\n\n";


    /* CUSTOMER */

    message +=
        "CUSTOMER DETAILS\n";

    message +=
        `Name: ${customer.name}\n`;

    message +=
        `Mobile: ${customer.phone}\n`;

    message +=
        `Address: ${customer.address}\n`;

    message +=
        `Pincode: ${customer.pincode}\n\n`;


    /* ORDER */

    message +=
        "ORDER DETAILS\n";


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;


        message +=
            `${index + 1}. ${item.name}\n`;

        message +=
            `   Qty: ${item.quantity}\n`;

        message +=
            `   Price: Rs. ${itemTotal}\n\n`;

    });


    message +=
        "--------------------------\n";


    message +=
        `Subtotal: Rs. ${totals.subtotal}\n`;


    message +=
        `Shipping: Rs. ${totals.shipping}\n`;


    message +=
        `Total: Rs. ${totals.total}\n\n`;


    /* PAYMENT */

    message +=
        "PAYMENT DETAILS\n";


    message +=
        `UPI ID: ${upiId}\n`;


    message +=
        `Amount to Pay: Rs. ${totals.total}\n\n`;


    message +=
        "Please make the payment using the UPI ID above.\n";


    message +=
        "After payment, please send the payment confirmation on WhatsApp.\n\n";


    message +=
        "Please confirm my order.";


    /* OPEN WHATSAPP */

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank"
    );

}


/* =========================================
   CONTACT WHATSAPP
   ========================================= */

function contactOnWhatsApp() {

    if (
        whatsappNumber ===
        "YOUR_WHATSAPP_NUMBER"
    ) {

        showNotification(
            "Please add your WhatsApp number in script.js"
        );

        return;

    }


    const message =
        "Hello NAARI, I would like to know more about your products.";


    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank"
    );

}


/* =========================================
   NOTIFICATION
   ========================================= */

function showNotification(message) {

    const notification =
        document.getElementById(
            "notification"
        );


    if (!notification) {
        return;
    }


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(function() {

        notification.classList.remove(
            "show"
        );

    }, 2500);

}


/* =========================================
   ESCAPE KEY
   ========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeProductDetails();

            closeCart();

        }

    }
);


/* =========================================
   INITIALIZE
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts();

        updateCartCount();

        setupSearch();

        updateUPIDisplay();

    }
);