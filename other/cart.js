/**
 * by Lukas Aronsson
 */
const form = document.getElementById("orderFrom");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phonenumber = document.getElementById("phone");
const address = document.getElementById("address");
const errorMessage = document.getElementById("errorMessage");
const sumbox = document.getElementById("totalPrice");
let message = []; //error messages (gets put in a di)
let tempCart = []; //temporary cart, before amount
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
    tempCart = JSON.parse(localStorage.getItem("cart")); //  cart = localstorage cart
    console.log("tempCart");
    console.log(tempCart);
    for (let i = 0; i < tempCart.length; i++) {
      if (
        tempCart[i].amount == false ||
        tempCart[i].amount == undefined ||
        tempCart[i].amount == NaN
      ) {
        getAmount();
      }
    }
    combineDuplicates();
    console.log("newTempCart");
    console.log(tempCart);
    cart = tempCart;
    setCart();
  }
}

/**
 * Sets Locaalstorage to the value of cart
 */
function setCart() {
  localStorage.setItem("cart", JSON.stringify(cart)); //updates the cart
}

/**
 * gets amount form localStorage and then calls addnewAmount
 */
function getAmount() {
  tempCart.forEach((product) => {
    product.amount = 1;
    console.log("product already had an amount of " + product.amount);
  });
}

function combineDuplicates() {
  for (let tempid = 0; tempid < tempCart.length; tempid++) {
    for (let i = 0; i < tempCart.length; i++) {
      if (tempid !== i) {
        if (tempCart[tempid]["id"] === tempCart[i]["id"]) {
          tempCart[tempid]["amount"] = tempCart[tempid]["amount"] + 1;
          removeDuplicates(i);
        }
      }
    }
  }
}

function removeDuplicates(index) {
  tempCart.splice(index, 1); //removes tempCart[index]
}

function changeAmount(index, value) {
  if (cart[index]["amount"] >= 1 && cart[index]["amount"] < 5) {
    cart[index]["amount"] += value;
    document.getElementById("amount" + index).innerHTML = cart[index]["amount"];
    setCart();
  }
}

/**
 * calls getCart() then takes cart and displayes the products in the cart
 */
function cartList() {
  getCart();
  let productsId = 0;
  let sum = 0; //the total value in € of the cart

  cart.forEach((product) => {
    $("#cartList").prepend(
      `<div id="cartProduct${productsId}" class="cartProduct">
        <img class="cartImage" src="${product.image}" alt="cartImage${productsId}"></img>
        <p class="cartName">${product.title}</p>
        <div class="amountBox">
        <button type="button" id="cartProduct${productsId}Plus" class="plusAndMinus, btn" onclick="changeAmount(${productsId},1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg></button>
        <p id="amount${productsId}" class="amountText">${product.amount}</p>
        <button type="button" id="cartProduct${productsId}Minus" class="plusAndMinus, btn" onclick="changeAmount(${productsId},-1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg></button></div>
        <p class="cartPrice">${product.price} €</p>
        <button
          type="button"
          class="btn btn-primary , removeButton"
          id="removeProduct${productsId}"
          onclick="removeFromCart(${productsId})">
          REMOVE>
        </button>
      </div>`
    ) && productsId++;
    sum += product.price * product.amount;
  });

  totalSum(sum);
}

/**
 * puts and calculates the sum of all products under the cart
 * @param {Integer} sum - the totalSum of the price of all products
 */
function totalSum(sum) {
  if (sum > 0) {
    sumbox.innerHTML = "Total Price " + sum + " €";
  }
}

/**
 * removes a product form the cart and then reloads the page
 * @param {Integer} index the index of the product in the cart array
 */
function removeFromCart(index) {
  cart.splice(index, 1);
  removeDuplicates(index, 1);
  if (cart.length <= 0) {
    localStorage.removeItem("cart");
  } else {
    setCart();
    setAmount();
  }
  window.location.reload();
}

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
