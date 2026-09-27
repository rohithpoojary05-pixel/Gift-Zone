let cart = JSON.parse(localStorage.getItem("giftZoneCart")) || [];


// =====================================
// GIFT ZONE - SURPRISE VIDEO SERVICE
// =====================================
// This stores whether the customer selected
// the optional Surprise Video service.
// Existing gift cart functionality is not changed.

function getSurpriseVideoSelection() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "giftZoneSurpriseVideo"
            )
        ) || {
            selected: false,
            price: 0
        };

    } catch (error) {

        return {
            selected: false,
            price: 0
        };

    }

}


// =====================================
// SAVE SURPRISE VIDEO SELECTION
// =====================================

function saveSurpriseVideoSelection(
    selected,
    price = 0
) {

    const videoData = {

        selected:
            Boolean(selected),

        price:
            Number(price) || 0

    };


    localStorage.setItem(
        "giftZoneSurpriseVideo",
        JSON.stringify(videoData)
    );


    return videoData;

}


// =====================================
// CLEAR SURPRISE VIDEO SELECTION
// =====================================

function clearSurpriseVideoSelection() {

    localStorage.setItem(
        "giftZoneSurpriseVideo",
        JSON.stringify({

            selected: false,

            price: 0

        })
    );

}


// =====================================
// GET SURPRISE VIDEO CHARGE
// =====================================

function getSurpriseVideoCharge() {

    const videoData =
        getSurpriseVideoSelection();


    if (!videoData.selected) {

        return 0;

    }


    return Number(
        videoData.price
    ) || 0;

}


// =====================================
// GET TOTAL INCLUDING SURPRISE VIDEO
// =====================================

function getGiftZoneGrandTotal() {

    let total = 0;


    cart.forEach(
        function (item) {

            total +=
                (
                    Number(item.price) || 0
                ) *
                (
                    Number(item.quantity) || 1
                );

        }
    );


    total +=
        getSurpriseVideoCharge();


    return total;

}


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
// GIFT ZONE PAGE LOADING SCREEN
// FLIPKART-STYLE PAGE LOADING
// =====================================

function createGiftZoneLoadingScreen() {

    let loadingScreen =
        document.getElementById(
            "loadingScreen"
        );


    if (!loadingScreen) {

        loadingScreen =
            document.createElement("div");


        loadingScreen.id =
            "loadingScreen";


        loadingScreen.className =
            "gift-zone-loading-screen";


        document.body.appendChild(
            loadingScreen
        );

    }


    loadingScreen.innerHTML = `

        <div class="gift-zone-loader-content">

            <div class="gift-zone-loader-logo">

                <span class="gift-zone-loader-gift">
                    🎁
                </span>

                <div class="gift-zone-loader-title">
                    GIFT ZONE
                </div>

            </div>


            <div class="gift-zone-spinner"></div>


            <div class="gift-zone-loading-text">
                Preparing your surprise...
            </div>

        </div>

    `;


    // =====================================
    // LOADING SCREEN DESIGN
    // =====================================

    if (
        !document.getElementById(
            "giftZoneLoadingStyle"
        )
    ) {

        const style =
            document.createElement("style");


        style.id =
            "giftZoneLoadingStyle";


        style.textContent = `

            #loadingScreen.gift-zone-loading-screen {

                position: fixed;

                inset: 0;

                width: 100%;

                height: 100%;

                background: #ffffff;

                display: flex;

                align-items: center;

                justify-content: center;

                z-index: 999999;

                opacity: 1;

                visibility: visible;

                transition:
                    opacity 0.35s ease,
                    visibility 0.35s ease;

            }


            #loadingScreen.gift-zone-loading-screen.hidden {

                opacity: 0;

                visibility: hidden;

                pointer-events: none;

            }


            .gift-zone-loader-content {

                text-align: center;

                display: flex;

                flex-direction: column;

                align-items: center;

                justify-content: center;

                min-width: 220px;

            }


            .gift-zone-loader-logo {

                display: flex;

                flex-direction: column;

                align-items: center;

                justify-content: center;

                margin-bottom: 22px;

            }


            .gift-zone-loader-gift {

                font-size: 58px;

                line-height: 1;

                display: block;

                margin-bottom: 10px;

                animation:
                    giftZoneGiftBounce 1s ease-in-out infinite;

            }


            .gift-zone-loader-title {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size: 25px;

                font-weight: 800;

                letter-spacing: 2px;

                color: #e91e63;

            }


            .gift-zone-spinner {

                width: 38px;

                height: 38px;

                border: 4px solid #f8c5d8;

                border-top: 4px solid #e91e63;

                border-radius: 50%;

                animation:
                    giftZoneSpin 0.8s linear infinite;

                margin-bottom: 15px;

            }


            .gift-zone-loading-text {

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size: 14px;

                color: #777;

                letter-spacing: 0.3px;

            }


            @keyframes giftZoneSpin {

                from {

                    transform: rotate(0deg);

                }

                to {

                    transform: rotate(360deg);

                }

            }


            @keyframes giftZoneGiftBounce {

                0%,
                100% {

                    transform: translateY(0);

                }

                50% {

                    transform: translateY(-7px);

                }

            }


            @media (max-width: 600px) {

                .gift-zone-loader-gift {

                    font-size: 52px;

                }


                .gift-zone-loader-title {

                    font-size: 22px;

                }


                .gift-zone-spinner {

                    width: 34px;

                    height: 34px;

                }


                .gift-zone-loading-text {

                    font-size: 13px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    return loadingScreen;

}


// =====================================
// SHOW GIFT ZONE LOADING
// =====================================

function showGiftZoneLoading() {

    const loadingScreen =
        createGiftZoneLoadingScreen();


    loadingScreen.classList.remove(
        "hidden"
    );

}


// =====================================
// HIDE GIFT ZONE LOADING
// =====================================

function hideGiftZoneLoading() {

    const loadingScreen =
        document.getElementById(
            "loadingScreen"
        );


    if (loadingScreen) {

        loadingScreen.classList.add(
            "hidden"
        );

    }

}


// =====================================
// PAGE READY
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =====================================
        // CREATE GIFT ZONE LOADING SCREEN
        // =====================================

        createGiftZoneLoadingScreen();


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

                    showGiftZoneLoading();


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
                            cart,


                        // =====================================
                        // SURPRISE VIDEO SERVICE
                        // =====================================
                        // This is added without changing
                        // the existing cart structure.

                        surpriseVideo:
                            getSurpriseVideoSelection()

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


                            hideGiftZoneLoading();


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


                                        showGiftZoneLoading();


                                        setTimeout(
                                            function () {

                                                window.location.href =
                                                    "payment.html";

                                            },
                                            350
                                        );

                                    };

                            } else {

                                showGiftZoneLoading();


                                setTimeout(
                                    function () {

                                        window.location.href =
                                            "payment.html";

                                    },
                                    350
                                );

                            }


                        },
                        700
                    );

                }
            );

        }


        // =====================================
        // INITIAL PAGE LOADING
        // =====================================

        showGiftZoneLoading();


        setTimeout(
            function () {

                hideGiftZoneLoading();

            },
            700
        );


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


        // Even if the cart is empty,
        // show video charge only if selected.
        total =
            getSurpriseVideoCharge();


        cartTotal.textContent =
            total;


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


    // =====================================
    // SURPRISE VIDEO CHARGE
    // =====================================

    const surpriseVideoCharge =
        getSurpriseVideoCharge();


    if (surpriseVideoCharge > 0) {

        total +=
            surpriseVideoCharge;


        cartItems.innerHTML += `

            <div class="cart-item gift-zone-video-cart-item">

                <div>

                    <h3>
                        🎥 Surprise Video
                    </h3>

                    <p>
                        Special surprise video service
                    </p>

                </div>


                <div>

                    <p>
                        ₹${surpriseVideoCharge}
                    </p>

                </div>

            </div>

        `;

    }


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


                    showGiftZoneLoading();


                    setTimeout(
                        function () {

                            window.location.href =
                                "login.html";

                        },
                        350
                    );

                };

        }


        return;

    }


    showGiftZoneLoading();


    setTimeout(
        function () {

            window.location.href =
                "checkout.html";

        },
        350
    );

}


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


        // Ignore JavaScript links.

        if (
            href.startsWith("javascript:")
        ) {

            return;

        }


        event.preventDefault();


        showGiftZoneLoading();


        setTimeout(
            function () {

                window.location.href =
                    href;

            },
            500
        );

    }
);
