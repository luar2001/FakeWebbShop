/**
 * by Lukas Aronsson
 */

const numberOfItems = 12; // the number of div boxes we want displayed.
const numberOfProducts = 20; //the number of products that exist in the json api form fakestoreapi https://fakestoreapi.herokuapp.com/
const api = "https://fakestoreapi.herokuapp.com/products/"; // the jsonAPI that vill be used to get products
const indexSite = window.location.href.indexOf("index.html");
let navbutton = true; //boolean for navBar (not currently working, might fix)
const productButton = document.getElementsByClassName("product");
let productsArray = []; //array that holds the products form first intake
let cart = []; //the array that holds the products that we want saved to localstorage
let i = 0;

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
      data.forEach((product) => productsArray.push(product)); //adds the products to productsArray
      console.log(productsArray);
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
    <h4 class ="title">${product.title}</h4>
    <img src="${product.image}" alt="product${productsId}" class="productImage"></img>
    <p class="text-primary, productDescription">${product.description}</p>
    <p class="price">${product.price} €</p>
    <button
      type="button"
      class="btn btn-primary btn-lg" 
      class="productButton"
      id="productButton${productsId}" value="${productsId}"
      onclick="addToCart(productsArray[this.value])"
    >
      Add To Cart
    </button>
    </div>
    `
        ) && productsId++ //adds 1 to productsId
    );
  }
}

// TODO LOW: make the header work correctly by manualy hiding and showing when the hamburger menu is pressed

/**
 * sets cart to whats stored in localStorage
 */
function getCart() {
  if (localStorage.getItem("cart") === null) {
    console.log("no products in cart");
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
 * when the user adds an item to cart it adds it to the cart array that gets pushed to localStorage
 * @param {Object} product
 */
function addToCart(product) {
  getCart();
  cart.push(product);
  setCart();
  window.location.assign("pages/cart.html");
}

products(numberOfItems, api);
