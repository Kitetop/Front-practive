var addToArrayForm = function (num, k) {
  let len = num.length,
    remainder = 0,
    res = [];
  while (len > 0 || k > 0) {
    len--;
    const temp = k % 10;
    let n1 = temp ? temp : 0,
      n2 = num[len] ? num[len] : 0;
    const sum = n1 + n2 + remainder;
    remainder = sum / 10 >> 0;
    k = k / 10 >> 0;
    const val = sum % 10;
    res.push(val);
  }
  if (remainder) {
    res.push(remainder)
  }
  return res.reverse()
};

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args1) {
        return curried.apply(this, args.contact(args1))
      }
    }
  }
}