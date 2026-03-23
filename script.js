// ====== DOM ELEMENTS ======
const logo = document.querySelector(".logo");
const cartBtn = document.querySelector(".cart");
const closeBtn = document.querySelector(".close-btn");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

const prev = document.querySelector(".nav-prev");
const next = document.querySelector(".nav-next");
const prev2 = document.querySelector(".nav-prev2");
const next2 = document.querySelector(".nav-next2");
const slide = document.querySelector(".slide");
const slide2 = document.querySelector(".slide2");

const buttons = document.querySelectorAll(".addcart");
const cartContent = document.querySelector(".cart-content");
const cartCount = document.getElementById("cart-count");
let total=document.querySelector("#total-price");

// ====== HOVER EFFECT ======
logo.addEventListener("mouseover", () => left.classList.add("active"));
logo.addEventListener("mouseout", () => left.classList.remove("active"));
left.addEventListener("mouseover", () => left.classList.add("active"));
left.addEventListener("mouseout", () => left.classList.remove("active"));

// ====== CART TOGGLE ======
cartBtn.addEventListener("click", () => right.classList.toggle("active"));
closeBtn.addEventListener("click", () => right.classList.remove("active"));

// ====== SLIDE NAVIGATION ======
next.addEventListener("click", () => slide.scrollBy({ left: 500, behavior: "smooth" }));
prev.addEventListener("click", () => slide.scrollBy({ left: -500, behavior: "smooth" }));
next2.addEventListener("click", () => slide2.scrollBy({ left: 500, behavior: "smooth" }));
prev2.addEventListener("click", () => slide2.scrollBy({ left: -500, behavior: "smooth" }));

// ====== CART FUNCTIONS ======
function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(cart) ? cart : [];
}


function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ====== INCREMENT ITEM ======
function inc(title) {
    let cart = getCart();
    const cartItem = cart.find(i => i.title === title);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        console.warn("Item not found in cart for increment:", title);
    }
    saveCart(cart);
    renderCart();
}

// ====== DECREMENT ITEM ======
function dec(title) {
    let cart = getCart();
    const cartItem = cart.find(i => i.title === title);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        cart = cart.filter(i => i.title !== title);
    }
    saveCart(cart);
    renderCart();
}

// ====== DELETE ITEM ======
function deleteItem(item) {
    let cart = getCart();
    cart = cart.filter(i => i.title !== item.title);
    saveCart(cart);
    renderCart();
}

// ====== RENDER CART ======
function renderCart() {
    const cart = getCart();
    cartContent.innerHTML = "";
    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-items");
        div.innerHTML = `
            <div class="cart-img"><img src="${item.img}" alt=""></div>
            <div class="cartpara">${item.title}</div>
            <p class="cart-price">${item.price}</p>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increment">+</button>
                <button class="delete-butn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        cartContent.appendChild(div);

        div.querySelector(".increment").addEventListener("click", () => inc(item.title));
        div.querySelector(".decrement").addEventListener("click", () => dec(item.title));

        div.querySelector(".delete-butn").addEventListener("click", () => deleteItem(item));
    });

    // Update cart count
    const totalQuantity = cart.reduce((acc, i) => acc + i.quantity, 0);
    cartCount.textContent = totalQuantity;
    if (totalQuantity > 0) cartCount.classList.add("active");
    else cartCount.classList.remove("active");
}

// ====== INITIAL RENDER ======
renderCart();

// ====== ADD TO CART BUTTONS ======
buttons.forEach(button => {
    button.addEventListener("click", () => {

        right.classList.add("active");

        const productBox = button.closest(".card");

        const title = productBox.querySelector("h3").textContent;
        const price = productBox.querySelector(".price").textContent;
        const img = productBox.querySelector("img").src;

        let cart = getCart();

        const existingItem = cart.find(i => i.title === title);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                title: title,
                price: price,
                img: img,
                quantity: 1
            });
        }

        saveCart(cart);
        renderCart();

    });
});

