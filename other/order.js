const orderInfo = document.getElementById("purchaseInfo");
let order = []; // the products that was orderd

/**
 * sets cart to whats stored in localStorage
 */
function getOrder() {
  order = JSON.parse(localStorage.getItem("cart")); //  cart = localstorage cart
}

/**
 * removes all products from localstorage
 */
function clearOrder() {
  window.localStorage.clear();
}

function continueShoping() {
  clearOrder();
  window.location.assign("../index.html");
}

function displayOrder() {
  getOrder();

  order.forEach((product) => {
    $("#purchaseInfo").append(
      `<h5>${product.title}</h5><p>Amount = ${product.amount}</p><p>${
        product.price * product.amount
      } €</p>`
    );
  });
}

displayOrder();
