/**
 * by Lukas Aronsson
 */
let numberOfItems = 6; // the number of div boxes we want displayed.
let numberOfProducts = 20; //the number of products that exist in the json api form fakestoreapi https://fakestoreapi.herokuapp.com/

/**
 * Randomizes and returns a number between min and max.
 *
 * @param {integer} min - lowest number that can be randomised.
 * @param {integer} max - highest number that can be randomised.
 * @return {integer} a randomised number between min and max.
 */
function randomNumber(min, max) {
  // TODO: maby optimize (remove the min value because it will always be 1)
  return Math.floor(Math.random() * (max - min + 1)) + min; // random number between min and max
}

/**
 * makes a List with integers that represent the product ids on the website fakestoreapi.
 *
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/
 * @param {integer} numberOfIds - the amount of ids that will be generated and stored in the List.
 * @return {array} a list of ids of hte length numberOfIds.
 */
function makeListOfIds(numberOfIds) {
  let ids = [numberOfIds];
  for (var i = 0; i < numberOfIds; i++) {
    ids[i] = randomNumber(1, numberOfIds); //randomNumber between 1-20
    // TODO: randomNumber remove values that have already been added
  }
  return ids;
}

/**
 * gets one product based on product id from the website fakestoreapi.
 *
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/
 * @param {id} productId - id of product on fakestoreapi.
 */
function getProduct(productId) {}

/**
 * displayes a product on the page by creating a div.
 *
 * @param {string} name - name of the product.
 * @param {string} description - pruducts description.
 * @param {integer} price - pruducts price.
 * @param {link} image - link to an image of product.
 */
function displayProduct(name, description, price, image) {
  document.getElementById("testProduct").innerHTML =
    "<h2>" +
    name +
    "</h2>" +
    '<p class="text-primary">' +
    description +
    "</p>" +
    '<p class="price">' +
    price +
    "</p>";
}

/**
 *
 *
 * @param {integer} numberOfItems - the number of div boxes we want displayed.
 * @param {integer} numberOfProducts - the number of products that exist in the json api form fakestoreapi.
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/.
 */
function products(numberOfItems, numberOfProducts) {
  let ids = makeListOfIds(numberOfItems); //array of product ids
  console.log(ids); // prints for testing purposes.

  displayProduct(
    "testname",
    "testDescription",
    10000,
    "https://www.placecage.com/200/300"
  ); // call to displayProduct with test values.
}

products(6, 20); //test call of products

// TODO: make the header work correctly by manualy hiding and showing when the hamburger menu is pressed
