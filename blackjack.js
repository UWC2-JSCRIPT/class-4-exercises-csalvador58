const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }
  drawCard() {
    const drawRandomCard = blackjackDeck[Math.floor(Math.random() * 52)];
    this.hand.push(drawRandomCard);
  }
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer Dan'); // TODO
const player = new CardPlayer('Player Penelope'); // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // Filter for only card val items in array using map method
  const cardValues = hand.map(item => item.val);
  // console.log(cardValues)

  // Calculate total points using reduce method on cardValues array
  const totalPoints = cardValues.reduce((sum, item) => sum + item);

  // Filter for Aces in hand array using filter method
  const numberOfAces = hand.filter(item => item.displayVal == 'Ace');
  // console.log(numberOfAces.length)


  // Using if else statements to cycle through different hands with zero to multiple Aces
  if (numberOfAces.length == 0) {               // No aces, return points and hand is not soft
    return {total: totalPoints, isSoft: false} 
  } else if (numberOfAces.length == 1) {               // 1 ace check
      if (totalPoints > 21) {
        return {total: totalPoints - 10, isSoft: false}
      } else {
        return {total: totalPoints, isSoft: true}
      }
  } else if (numberOfAces. length == 2) {               // 2 aces check
      if ((totalPoints - 10) > 21) {
        return {total: totalPoints - 20, isSoft: false}
      } else {
        return {total: totalPoints - 10, isSoft: true}
      }
  } else if (numberOfAces.length == 3) {               // 3 aces check
      if ((totalPoints - 20) > 21) {
        return {total: totalPoints - 30, isSoft: false}
      } else {
        return {total: totalPoints - 20, isSoft: true}
      }
  } else if (numberOfAces.length == 4) {              // 4 aces check
      if ((totalPoints - 30) > 21) {
        return {total: totalPoints - 40, isSoft: false}
      } else {
        return {total: totalPoints - 30, isSoft: true}
      }
  }
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE

}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE

}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
// console.log(startGame());