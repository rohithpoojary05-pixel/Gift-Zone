let cart = JSON.parse(localStorage.getItem("giftZoneCart")) || [];


// =====================================
// GIFT ZONE ATTRACTIVE POPUP
// =====================================

function showGiftPopup(
    title,
    message,
    icon = "🎁",
    buttonText = "Okay ❤️"
) {

    const popup =
        document.getElementById("giftPopup");

    const popupIcon =
        document.getElementById("giftPopupIcon");

    const popupTitle =
        document.getElementById("giftPopupTitle");

    const popupMessage =
        document.getElementById("giftPopupMessage");

    const popupButton =
        document.getElementById("giftPopupButton");

    const popupClose =
        document.getElementById("giftPopupClose");


    if (!popup) {

        alert(
            title + "\n\n" + message
        );

        return;

    }


    popupIcon.textContent =
        icon;

    popupTitle.textContent =
        title;

    popupMessage.innerHTML =
        message;

    popupButton.textContent =
        buttonText;


    popup.classList.add("show");


    popupButton.onclick =
        function () {

            popup.classList.remove("show");

        };


    if (popupClose) {

        popupClose.onclick =
            function () {

                popup.classList.remove("show");

            };

    }


    popup.onclick =
        function (event) {

            if (event.target === popup) {

                popup.classList.remove("show");

            }

        };

}


// =====================================
// GET LOGGED-IN CUSTOMER
// =====================================

function getLoggedInCustomer() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "giftZoneLoggedInCustomer"
            )
        );

    } catch (error) {

        return null;

    }

}


// =====================================
// PAGE READY
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =====================================
        // ADD TO CART BUTTONS
        // =====================================

        const addToCartButtons =
            document.querySelectorAll(
                ".gift-card button"
            );


        addToCartButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        const card =
                            button.closest(
                                ".gift-card"
                            );


                        if (!card) {

                            return;

                        }


                        const name =
                            card.querySelector(
                                "h3"
                            )?.textContent || "";


                        const priceText =
                            card.querySelector(
                                "p"
                            )?.textContent || "0";


                        const price =
                            parseInt(
                                priceText
                                    .replace("₹", "")
                                    .trim()
                            ) || 0;


                        const existingItem =
                            cart.find(
                                function (item) {

                                    return (
                                        item.name ===
                                        name
                                    );

                                }
                            );


                        if (existingItem) {

                            existingItem.quantity++;

                        } else {

                            cart.push({

                                name:
                                    name,

                                price:
                                    price,

                                quantity:
                                    1

                            });

                        }


                        localStorage.setItem(
                            "giftZoneCart",
                            JSON.stringify(cart)
                        );


                        showGiftPopup(
                            "Added to Cart! 🛒",
                            "<strong>" +
                                name +
                            "</strong><br><br>" +
                            "Your special gift has been added to your shopping cart.",
                            "🎁",
                            "Continue Shopping ❤️"
                        );

                    }
                );

            }
        );


        // =====================================
        // DISPLAY CART
        // =====================================

        displayCart();


        // =====================================
        // CHECKOUT FORM
        // =====================================

        const checkoutForm =
            document.getElementById(
                "checkoutForm"
            );


        if (checkoutForm) {

            checkoutForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    // =====================================
                    // CHECK LOGIN
                    // =====================================

                    const loggedInCustomer =
                        getLoggedInCustomer();


                    if (!loggedInCustomer) {

                        showGiftPopup(
                            "Login Required 🔐",
                            "Please login to your Gift Zone account before placing an order.",
                            "🔐",
                            "Go to Login"
                        );


                        const popupButton =
                            document.getElementById(
                                "giftPopupButton"
                            );


                        if (popupButton) {

                            popupButton.onclick =
                                function () {

                                    const popup =
                                        document.getElementById(
                                            "giftPopup"
                                        );

                                    if (popup) {

                                        popup.classList.remove(
                                            "show"
                                        );

                                    }

                                    window.location.href =
                                        "login.html";

                                };

                        }


                        return;

                    }


                    // =====================================
                    // CHECK CART
                    // =====================================

                    if (cart.length === 0) {

                        showGiftPopup(
                            "Your Cart is Empty! 🛒",
                            "Please choose a special gift before continuing to checkout.",
                            "🛒",
                            "Choose a Gift"
                        );

                        return;

                    }


                    // =====================================
                    // SHOW LOADING
                    // =====================================

                    const loadingScreen =
                        document.getElementById(
                            "loadingScreen"
                        );


                    if (loadingScreen) {

                        loadingScreen.classList.remove(
                            "hidden"
                        );

                    }


                    // =====================================
                    // GET FORM VALUES
                    // =====================================

                    const enteredCustomerName =
                        document.getElementById(
                            "customerName"
                        )?.value.trim() || "";


                    const enteredCustomerPhone =
                        document.getElementById(
                            "customerPhone"
                        )?.value.trim() || "";


                    // =====================================
                    // CUSTOMER INFORMATION
                    // =====================================

                    const customerName =
                        enteredCustomerName ||
                        loggedInCustomer.name ||
                        loggedInCustomer.loginName ||
                        "";


                    const customerPhone =
                        enteredCustomerPhone ||
                        loggedInCustomer.mobile ||
                        "";


                    // =====================================
                    // SAVE CHECKOUT DETAILS
                    // =====================================

                    const checkoutDetails = {

                        // IMPORTANT:
                        // This connects the order
                        // to the logged-in customer.
                        customerId:
                            loggedInCustomer.customerId || "",


                        customerName:
                            customerName,


                        customerPhone:
                            customerPhone,


                        customerEmail:
                            loggedInCustomer.email || "",


                        recipientName:
                            document.getElementById(
                                "recipientName"
                            )?.value || "",


                        recipientPhone:
                            document.getElementById(
                                "recipientPhone"
                            )?.value || "",


                        address:
                            document.getElementById(
                                "address"
                            )?.value || "",


                        deliveryDate:
                            document.getElementById(
                                "deliveryDate"
                            )?.value || "",


                        deliveryTime:
                            document.getElementById(
                                "deliveryTime"
                            )?.value || "",


                        surpriseMessage:
                            document.getElementById(
                                "surpriseMessage"
                            )?.value || "",


                        specialInstructions:
                            document.getElementById(
                                "specialInstructions"
                            )?.value || "",


                        cart:
                            cart

                    };


                    // =====================================
                    // SAVE CHECKOUT
                    // =====================================

                    localStorage.setItem(
                        "giftZoneCheckout",
                        JSON.stringify(
                            checkoutDetails
                        )
                    );


                    // =====================================
                    // NEXT STEP: PAYMENT
                    // =====================================

                    setTimeout(
                        function () {


                            if (loadingScreen) {

                                loadingScreen.classList.add(
                                    "hidden"
                                );

                            }


                            showGiftPopup(
                                "Details Saved! 🎉",
                                "Your delivery details have been saved successfully.<br><br><strong>Next step:</strong> Complete your payment.",
                                "💖",
                                "Continue to Payment →"
                            );


                            const popupButton =
                                document.getElementById(
                                    "giftPopupButton"
                                );


                            if (popupButton) {

                                popupButton.onclick =
                                    function () {

                                        const popup =
                                            document.getElementById(
                                                "giftPopup"
                                            );


                                        if (popup) {

                                            popup.classList.remove(
                                                "show"
                                            );

                                        }


                                        window.location.href =
                                            "payment.html";

                                    };

                            } else {

                                window.location.href =
                                    "payment.html";

                            }


                        },
                        700
                    );

                }
            );

        }


    }
);


// =====================================
// DISPLAY CART
// =====================================

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (!cartItems || !cartTotal) {

        return;

    }


    cartItems.innerHTML =
        "";


    let total =
        0;


    // =====================================
    // EMPTY CART
    // =====================================

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty 🛒</p>";

        cartTotal.textContent =
            "0";

        return;

    }


    // =====================================
    // DISPLAY CART ITEMS
    // =====================================

    cart.forEach(
        function (item, index) {

            const itemTotal =
                item.price *
                item.quantity;


            total +=
                itemTotal;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            Price: ₹${item.price}
                        </p>

                    </div>


                    <div>

                        <button
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})">

                            +

                        </button>


                        <p>
                            ₹${itemTotal}
                        </p>


                        <button
                            onclick="removeItem(${index})">

                            🗑️

                        </button>

                    </div>

                </div>

            `;

        }
    );


    cartTotal.textContent =
        total;

}


// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity++;


    saveCart();

}


// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(
            index,
            1
        );

    }


    saveCart();

}


// =====================================
// REMOVE ITEM
// =====================================

function removeItem(index) {

    if (!cart[index]) {

        return;

    }


    cart.splice(
        index,
        1
    );


    saveCart();

}


// =====================================
// SAVE CART
// =====================================

function saveCart() {

    localStorage.setItem(
        "giftZoneCart",
        JSON.stringify(cart)
    );


    displayCart();

}


// =====================================
// CHECKOUT BUTTON
// =====================================

function checkout() {

    if (cart.length === 0) {

        showGiftPopup(
            "Your Cart is Empty! 🛒",
            "Please add a beautiful gift before proceeding to checkout.",
            "🛒",
            "Choose a Gift"
        );

        return;

    }


    // =====================================
    // CHECK LOGIN BEFORE CHECKOUT
    // =====================================

    const loggedInCustomer =
        getLoggedInCustomer();


    if (!loggedInCustomer) {

        showGiftPopup(
            "Login Required 🔐",
            "Please login to your Gift Zone account before checkout.",
            "🔐",
            "Go to Login"
        );


        const popupButton =
            document.getElementById(
                "giftPopupButton"
            );


        if (popupButton) {

            popupButton.onclick =
                function () {

                    const popup =
                        document.getElementById(
                            "giftPopup"
                        );


                    if (popup) {

                        popup.classList.remove(
                            "show"
                        );

                    }


                    window.location.href =
                        "login.html";

                };

        }


        return;

    }


    window.location.href =
        "checkout.html";

}


// =====================================
// PAGE LOADING SCREEN
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loadingScreen =
            document.getElementById(
                "loadingScreen"
            );


        if (loadingScreen) {

            setTimeout(
                function () {

                    loadingScreen.classList.add(
                        "hidden"
                    );

                },
                700
            );

        }

    }
);


// =====================================
// PAGE CHANGE LOADING
// =====================================

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest("a");


        if (!link) {

            return;

        }


        const href =
            link.getAttribute("href");


        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            link.target === "_blank"
        ) {

            return;

        }


        const loadingScreen =
            document.getElementById(
                "loadingScreen"
            );


        if (!loadingScreen) {

            return;

        }


        event.preventDefault();


        loadingScreen.classList.remove(
            "hidden"
        );


        setTimeout(
            function () {

                window.location.href =
                    href;

            },
            500
        );

    }
);