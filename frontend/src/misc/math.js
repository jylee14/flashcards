Math.average = function(...nums) {
  if(nums.length === 0) { return undefined }

  let sum = 0
  for(let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if(typeof num !== 'number') {
      throw new TypeError(`element ${num} is not a number`)
    }
    sum += Number(num)
  }
  return sum/nums.length
}

Math.sum = function(...nums) {
  if(nums.length === 0) { return 0 }
  let sum = 0
  nums.forEach(num => sum += num)
  return sum
}