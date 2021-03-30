/**
 * by Lukas Aronsson
 */
const form = document.getElementById("orderFrom");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phonenumber = document.getElementById("phone");
const address = document.getElementById("address");
const errorMessage = document.getElementById("errorMessage");
const sum = document.getElementById("totalPrice");
let message = []; //error messages (gets put in a di)
let cart = []; //stores all the products that are in the cart

/**
 * Removes the form so that the user can't purchase if there is not products
 */
function removeForm() {
  $("#orderFrom").remove();
}

/**
 * sets cart to whats stored in localStorage
 */
function getCart() {
  if (localStorage.getItem("cart") === null) {
    $("#cartList").prepend(
      '<h2 style="text-align:center"><B>Cart is empty</b></h2>'
    );
    removeForm();
  } else {
    cart = JSON.parse(localStorage.getItem("cart")); //  cart = localstorage cart
  }
}

/**
 * Sets Locaalstorage to the value of cart
 */
function setCart() {
  localStorage.setItem("cart", JSON.stringify(cart)); //updates the cart
}

/**
 * puts and calculates the sum of all products under the cart
 * @param {Integer} Sum - the totalSum of the price of all products
 */
function totalSum(Sum) {
  if (Sum > 0) {
    sum.innerHTML = "Total Price " + Sum + " €";
  }
}

/**
 * calls getCart() then takes cart and displayes the products in the cart
 */
function cartList() {
  getCart();

  let productsId = 0;
  let Sum = 0; //the total value in € of the cart

  cart.forEach((product) => {
    $("#cartList").prepend(
      `<div id="cartProduct${productsId}" class="cartProduct">
        <img class="cartImage" src="${product.image}" alt="cartImage${productsId}"></img>
        <p class="cartName">${product.title}</p>
        <p class="cartPrice">${product.price} €</p>
        <button
          type="button"
          class="btn btn-primary , removeButton"
          id="removeProduct${productsId}"
          value="${productsId}"
          onclick="removeFromCart(${productsId})">
          REMOVE
        </button>
      </div>`
    ) && productsId++;
    Sum += product.price;
  });

  totalSum(Sum);
}

/**
 * removes a product form the cart and then reloads the page
 * @param {Integer} index the index of the product in the cart array
 */
function removeFromCart(index) {
  cart.splice(index, 1);
  if (cart.length <= 0) {
    localStorage.removeItem("cart");
  } else {
    setCart();
  }
  window.location.reload();
}

// TODO: drop down to change amount of product

/**
 * when the validation sucseeed, this sends the user to the order page and sets the cart again
 */
function orderSuccess() {
  setCart();
  window.location.assign("confirmation.html"); //gose by the relative location to cart.html not the script.js file
}

/**
 * validation of the user inputted name
 * @param {String} name - the user inputted name (can be full name including middle names)
 * @return {Boolean} true or false depending on if the name was validated or not
 */
function validateName(name) {
  //im only gonna allow ASCII and swedish letters for now
  //TODO LOW: add non-ASCII letters
  const regex = /^[a-zA-ZäöåÄÖÅ\- ]+$/;

  if (regex.test(name)) {
    return true;
  } else {
    message.push(name + " did NOT adhear to the nameing standard of this site");
    return false;
  }
}

/**
 * validation of the user inputted email
 * @param {String} email - the user inputted email
 * @Link the regex i used for validation is based on a simplification of the RFC 2822 standard https://tools.ietf.org/html/rfc2822#section-3.4.1
 * @return {Boolean} true or false depending on if the email was validated or not
 */
function validateEmail(email) {
  //const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //this regex is way stricter and removes email addresses with no . after the @, aparently some email providers allow that ?

  const regex = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ); //adhears to 99.99% of all email addresses in actual use today. and is based on RFC 2822  https://tools.ietf.org/html/rfc2822#section-3.4.1

  if (regex.test(email)) {
    return true;
  } else {
    message.push(email + " did NOT adhear to international email standard");
    return false;
  }
}

/**
 * validation of the user inputted phoneNumber
 * @param {String} phonenumber - the user inputted phonenumber (has to be string to work with regex)
 * @return {Boolean} true or false depending on if the phoneNumber was validated or not
 */
function validatePhone(phonenumber) {
  /**
   * regex for phone number verification
   * Valid Phonenumber formats:
   * (123) 456-7890
   * (123)456-7890
   * 123-456-7890
   * 123.456.7890
   * 1234567890
   * +31636363634
   * 075-63546725
   */
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (regex.test(phonenumber)) {
    message.push();
    return true;
  } else {
    message.push(
      phonenumber + " did NOT adhear to international phonenumber standard"
    );
    return false;
  }
}

/**
 * validation of the user inputted address
 * @param {String} address - the user inputted address
 * @return {Boolean} true or false depending on if the address was validated or not
 */
function validateAddress(address) {
  const regex = /^[a-zA-ZäöåÄÖÅ0-9\-, ]+$/; //allows all latin and swedish characters including numbers
  if (regex.test(address)) {
    return true;
  } else {
    message.push(
      address + " did NOT adhear to the address standard of this site"
    );
    return false;
  }
}

/**
 * when the purchase button is clicked
 */
form.addEventListener("submit", (e) => {
  e.preventDefault(); //prevents page reload on submit
  if (
    validateName(name.value) &&
    validateEmail(email.value) &&
    validatePhone(phonenumber.value) &&
    validateAddress(address.value)
  ) {
    //if all validations return true
    orderSuccess();
  }
  if (message.length > 0) {
    errorMessage.innerHTML = message.join("\n , ");
  }
});

cartList(); //call for the cartList class
