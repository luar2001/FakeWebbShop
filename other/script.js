/**
 * by Lukas Aronsson
 */

const numberOfItems = 12; // the number of div boxes we want displayed.
const numberOfProducts = 20; //the number of products that exist in the json api form fakestoreapi https://fakestoreapi.herokuapp.com/
const api = "https://fakestoreapi.herokuapp.com/products/"; // the jsonAPI that vill be used to get products
let navbutton = true; //boolean for navBar
const form = document.getElementById("orderFrom");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phonenumber = document.getElementById("phone");
const address = document.getElementById("address");
const errorMessage = document.getElementById("errorMessage");
let message = []; //error messages

/**
 * gets an array of products based on product ids from the website fakestoreapi.
 *
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/
 * @parm numberOfItems - the number of products to save from fakestoreapi
 */
function products(numberOfItems, api) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", api);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);
      displayProducts(data, numberOfItems);
    }
  };
}

/**
 * displayes a product on the page by creating a div.
 *
 * @param {array} products - an array of json that are products form fakestoreAPI
 * @param {Integer} numberOfItems - the number of items to display
 */
function displayProducts(products, numberOfItems) {
  let productsId = 0;

  while (productsId < numberOfItems) {
    products.forEach(
      (product) =>
        $("#products").append(
          `<div id="product${productsId}" class="product">
    <h4>${product.title}</h4>
    <img src="${product.image}" alt="product${productsId}" class="productImage"></img>
    <p class="text-primary, productDescription">${product.description}</p>
    <p class="price">${product.price} €</p>
    <button
      type="button"
      class="btn btn-primary btn-lg , productButton"
      id="productButton${productsId}"
    >
      Add To Cart
    </button>
    </div>
    `
        ) && productsId++ //adds 1 to x
    );
  }
}

products(numberOfItems, api);

// TODO LOW: make the header work correctly by manualy hiding and showing when the hamburger menu is pressed

// TODO: make cart work (how do i do that ? )
// TODO: drop down to change amount of product
// TODO: CHECK if there are products in the cart

// TODO: Tanck you for Your order pop up and failed order popup
function orderSuccess() {
  window.location.assign("order-confirmation.html"); //gose by the relative location to cart.html not the script.js file
}

// TODO: Validate forms

form.addEventListener("submit", (e) => {
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
    e.preventDefault(); //prevents page reload on submit
    errorMessage.innerHTML = message.join("\n , ");
  }
});

/**
 * validation of the user inputted name
 * @param {String} name - the user inputted name (can be full name including middle names)
 * @return {Boolean} true or false depending on if the name was validated or not
 */
function validateName(name) {
  //im only gonna allow ASCII and swedish letters
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
    message.push(
    );
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

//REDUNDANT BELOW (wanted to randomise the shown items but ran out of time and patience)

/**
 * makes an array with integers that represent the product ids on the website fakestoreapi.
 *
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/
 * @param {integer} numberOfIds - the amount of ids that will be generated and stored in the List.
 * @return {array} a list of ids of hte length numberOfIds.
 */
function makeListOfIds(numberOfIds) {
  let ids = [numberOfIds];
  for (var i = 0; i < numberOfIds; i++) {
    ids[i] = randomNumber(1, numberOfIds); //randomNumber between 1-20
    // TODO LOW:randomNumber remove values that have already been added
  }
  return ids;
}

/**
 * Randomizes and returns a number between min and max.
 *
 * @param {integer} min - lowest number that can be randomised.
 * @param {integer} max - highest number that can be randomised.
 * @return {integer} a randomised number between min and max.
 */
function randomNumber(min, max) {
  // TODO LOW: maby optimize (remove the min value because it will always be 1)
  return Math.floor(Math.random() * (max - min + 1)) + min; // random number between min and max
}
