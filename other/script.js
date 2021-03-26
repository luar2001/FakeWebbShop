/**
 * by Lukas Aronsson
 */

const numberOfItems = 12; // the number of div boxes we want displayed.
const numberOfProducts = 20; //the number of products that exist in the json api form fakestoreapi https://fakestoreapi.herokuapp.com/

/**
 * gets an array of products based on product ids from the website fakestoreapi.
 *
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/
 * @parm numberOfItems - the number of products to save from fakestoreapi
 */
function getProducts(numberOfItems) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://fakestoreapi.herokuapp.com/products/`);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.response);
      renderJSON(json);
    }
  };

  function renderJSON(data) {
    if (Array.isArray(data)) {
      console.log("IS ARRAY :(");
      displayProducts(data, numberOfItems);
    } else {
      console.log("ITS NOT ARRAY :)");
    }
  }
}

/**
 * displayes a product on the page by creating a div.
 *
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/
 * @param {array} products - an array of json that are products form fakestoreAPI
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

/**
 *
 *
 * @param {integer} numberOfItems - the number of div boxes we want displayed.
 * @param {integer} numberOfProducts - the number of products that exist in the json api form fakestoreapi.
 * @link fakestoreapi = https://fakestoreapi.herokuapp.com/.
 */
function products(numberOfItems) {
  getProducts(numberOfItems);
}

products(numberOfItems); //test call of products

// TODO: make the header work correctly by manualy hiding and showing when the hamburger menu is pressed

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
    // TODO: randomNumber remove values that have already been added
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
  // TODO: maby optimize (remove the min value because it will always be 1)
  return Math.floor(Math.random() * (max - min + 1)) + min; // random number between min and max
}
