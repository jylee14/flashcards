/* eslint no-extend-native: 0 */
String.prototype.capitalize = function () {
  const firstChar = this.charAt(0)
  if (/\w+/.test(firstChar)) {
    return firstChar.toUpperCase() + this.slice(1)
  }
  return this
}

String.prototype.isDigit = function() {
  return /^\d$/.test(this)
}

String.prototype.capitalizeEach = function() {
  return this.split(' ').map(word => word.capitalize()).join(' ')
}

String.prototype.ignoreCaseIncludes = function(substring) {
  return this.toLowerCase().includes(substring.toLowerCase())
}

String.prototype.toISODate = function() {
  const dateComponents = this.split('-') // expect - delimiter
  const year = dateComponents[0]
  const month = dateComponents[1] || '01'
  const date = dateComponents[2] || '01'
  return new Date(`${year}-${month}-${date}`)
}

String.prototype.toCamelCase = function() {
  const components = this.split(' ')
  const upperCased = components.map((component, i) => i === 0 ? component.toLowerCase() : component.capitalize())
  return upperCased.join('')
}