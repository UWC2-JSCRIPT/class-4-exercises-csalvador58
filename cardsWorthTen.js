const cards = [
  { val: 2, displayVal: "2", suit: "hearts" },
  { val: 3, displayVal: "3", suit: "hearts" },
  { val: 4, displayVal: "4", suit: "hearts" },
  { val: 5, displayVal: "5", suit: "hearts" },
  { val: 6, displayVal: "6", suit: "hearts" },
  { val: 7, displayVal: "7", suit: "hearts" },
  { val: 8, displayVal: "8", suit: "hearts" },
  { val: 9, displayVal: "9", suit: "hearts" },
  { val: 10, displayVal: "10", suit: "hearts" },
  { val: 10, displayVal: "Jack", suit: "hearts" },
  { val: 10, displayVal: "Queen", suit: "hearts" },
  { val: 10, displayVal: "King", suit: "hearts" },
  { val: 11, displayVal: "Ace", suit: "hearts" }
];

/**
 * Takes an array of cards and returns a string of the card display
 * values where the value is equal to 10
 *
 * @param {array} cards
 * @return {string} displayVal
 */
const cardsWorthTen = cards => {
  return cards.filter(item => item.val == 10).map(item => item.displayVal);
};
/* Code explained:
The filter method is first called on the 'cards' array to check the 'val' property of each object and only include those with a value equal to 10. The map method was then applied to create a new array with the filtered objects but only include the values from the displayVal property.
*/

console.log(cardsWorthTen(cards));
// should return/log "10, Jack, Queen, King"
