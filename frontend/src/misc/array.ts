/* eslint no-extend-native: 0 */
/* eslint @typescript-eslint/ban-types: 0 */

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
Array.prototype.shuffled = function<T> () {
  const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

  const n = this.length
  const shuffled: Array<T> = []
  const indices = new Set()
  
  while(indices.size < n) {
    const randomIndex = getRandomInt(n)
    if(indices.has(randomIndex)) { continue }

    shuffled.push(this[randomIndex])
    indices.add(randomIndex)
  }
  return shuffled
}

export { }