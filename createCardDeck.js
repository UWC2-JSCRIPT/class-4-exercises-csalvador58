/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */



const getDeck = () => {

  // Initialize variables that will be used in function
  const deck = [];
  const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  const specialCards =['Jack', 'Queen', 'King'];

  let count = 1;
  let countSuit = 0;

  // Function to create a new card object in the deck array
  const createCard = (value, display, suitCard) => {
    const card = {val: value, displayVal: String(display), suit: suitCard};
    deck.push(card);
  }

  // While loop to build a 52 card deck array
  while (deck.length !== 52) {
    
    if (deck.length == 0 || count % 14 == 0) {   // Create Ace cards
      createCard(11, 'Ace', suits[countSuit]);

    } else if (count > 10) {   // Create Special Cards
      createCard(10, specialCards[(count % 10) - 1], suits[countSuit]);

    } else {         // Create normal cards from '2' through '10'
      createCard(count, count, suits[countSuit]);
    }

    // Track status counters to ensure correct card and suit are created
    count++;
    if (count == 14) {
      countSuit++;    // Increase counter to start creating cards with next suit
    } else if (count == 15) {
      count = 2;      // Reset counter to create cards in each suit, starts at '2' since 'Ace' card is in place of '1'
    }
  }
  return deck;
}


// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];
console.log('Random card: '); // Added line to check
console.log(randomCard);      // Added line to check

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);