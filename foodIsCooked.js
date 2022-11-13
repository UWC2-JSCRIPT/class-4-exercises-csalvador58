/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */

const foodIsCooked = function(kind, internalTemp, doneness) {
  // Check meat type
  if (kind == 'chicken') {
    // Check if meat temp is within required range
    return internalTemp > 165 ? true : false;

  // Check meat type
  } else if (kind == 'beef') {
    // Check doneness then check if meat temp within required range
    if (doneness == 'rare') {
      return (internalTemp > 125 && internalTemp <= 135) ? true : false;
    } else if (doneness == 'medium') {
        return (internalTemp > 135 && internalTemp <= 155) ? true : false;
    } else if (doneness == 'well') {
        return (internalTemp > 155) ? true : false;
    }
  }
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be false