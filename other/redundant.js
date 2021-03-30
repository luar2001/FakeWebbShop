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
