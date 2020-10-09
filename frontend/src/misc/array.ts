/* eslint no-extend-native: 0 */

declare global {
  interface Array<T> {
    shuffle: () => void;
    shuffled: () => Array<T>;
  }
}

/**
 * Shuffled the array in place 
 * 
 * @returns None 
 */
Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
}

/**
 * Returns a new shuffled array 
 * 
 * @returns any[] - Array containing the contents of this but shuffled
 */
Array.prototype.shuffled = function () {
  const shuffled = []
  for (let i = this.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
    shuffled.push(this[i])
  }
  return shuffled
}

export { }