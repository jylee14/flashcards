class Counter {
  constructor(collection) {
    for(const element of collection) {
      if(!this[element]) {
        this[element] = 0
      }
      this[element]++
    }
  }

  get mostFrequent() {
    let maxFreq = 0
    let maxObject = null
    for(let key in this) {
      if(this[key] > maxFreq) {
        maxFreq = this[key]
        maxObject = key
      }
    }

    return {
      element: maxObject,
      frequency: maxFreq
    }
  }
}

export { Counter }