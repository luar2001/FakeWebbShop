const orderInfo = document.getElementById("purchaseInfo");
let order = []; // the products that was orderd

/**
 * sets cart to whats stored in localStorage
 */
function getOrder() {
  if (localStorage.getItem("cart") === null) {
    console.log("no products in order");
  } else {
    order = JSON.parse(localStorage.getItem("cart")); //  cart = localstorage cart
  }
}

/**
 * removes all products from localstorage
 */
function clearOrder() {
  localStorage.clear();
}

function ContinueShoping() {
  clearCart();
  window.location.assign("../index.html");
}

function displayOrder() {
  getCart();

  order.forEach((product) => {
    `<h2>${product.title}</h2><p>${product.price} €</p>`;
  });
}
