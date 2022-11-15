const blackjackDeck = getDeck();
console.clear();

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
  // Create dealer draw rules with if and else statements
  const dealerPoints = calcPoints(dealerHand);

  // Dealer must draw if hand is 16 points or less
  if (dealerPoints.total <= 16) {
    return true;
  } else if (dealerPoints.total == 17 && dealerPoints.isSoft == true) {
    // Dealer must draw if hand is exactly 17 points and has an Ace valued at 11
    return true;
  } else {
    // Dealer does not draw and ends turn
    return false;
  }
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {

  let result;

  // Create switch statement to run through possible win/loss scenarios and return result.
  switch(true) {
    case (dealerScore > 21):
      result = `Player's Score: ${playerScore}, Dealer's Score: ${dealerScore}. Dealer Busts! Player Wins!`;
      break;
    case (playerScore > 21):
      result = `Dealer's Score: ${dealerScore}, Player's Score: ${playerScore}. Player Busts! Dealer Wins!`;
      break;
    case (dealerScore == playerScore):
      result = `Player's Score: ${playerScore}, Dealer's Score: ${dealerScore}. It's a tie game!`;
      break;
    case ((playerScore == 21)):
      result = `Player's Score: ${playerScore}, Dealer's Score: ${dealerScore}. Blackjack! Player Wins!`;
      break;
    case ((dealerScore == 21)):
      result = `Dealer's Score: ${dealerScore}, Player's Score: ${playerScore}. Blackjack! Dealer Wins!`;
      break;
    case ((21 - dealerScore) < (21 - playerScore)):
      result = `Dealer's Score: ${dealerScore}, Player's Score: ${playerScore}. Dealer Wins!`;
      break;
    case ((21 - dealerScore) > (21 - playerScore)):
      result = `Player's Score: ${playerScore}, Dealer's Score: ${dealerScore}. Player Wins!`;
      break;
  }
  // Display winner as HTML
  displayWinner.textContent = result;
  return result;
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
  // Select DOM element and append a node to display text
  const displayPlayer = document.querySelector("#displayPlayer");
  const pEl = document.createElement("p");
  displayPlayer.appendChild(pEl);


  const displayHand = player.hand.map((card) => card.displayVal);

  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);

  // Display player hand as HTML
  const pTextNode = document.createTextNode(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
  pEl.appendChild(pTextNode);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {

  // // Code to use JS DOM to display game winner/scores
  // const displayPlayer = document.querySelector("#displayPlayer");
  // const displayDealer = document.querySelector("#displayDealer");
  // const displayWinner = document.querySelector("#displayWinner");

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
    // Display winner as HTML
    displayWinner.textContent = 'You went over 21 - you lose!';
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);
  // Display status as HTML
  displayPlayerStatus.textContent = `Player stands at ${playerScore}`;

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    // Display winner as HTML
    displayWinner.textContent = 'Dealer went over 21 - you win!';
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);
  // Display status as HTML
  displayDealerStatus.textContent = `Dealer stands at ${dealerScore}`;

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());