/******************************************************************************************************************
 *   LeetCode: 821.字符的最短距离 
 *     给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。
 *     返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。
 *     两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。
 ******************************************************************************************************************
 */


var shortestToChar = function (s, c) {
  const cacheObj = stringToIndexObj(s, c);
  const result = [];
  for (let i = 0; i < s.length; i++) {
    let len;
    for (let j = 0; j < cacheObj.length; j++) {
      if (j == 0) len = Math.abs(cacheObj[j] - i);
      len = Math.abs(cacheObj[j] - i) < len ? Math.abs(cacheObj[j] - i) : len;
    }
    result.push(len);
  }
  return result;
};

var stringToIndexObj = function (s, c) {
  const cacheResult = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] == c) cacheResult.push(i);
  }
  return cacheResult;
}
/*************************************************
 * 实现symbol polyfill
 * 如果浏览器不支持情况下,写出让代码让浏览器支持symbol
 *************************************************
 */
!(function () {
  'use strict'
  const SymbolPolyfill = function Symbol(description) {
    // Symbol函数前不能使用new命令
    if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor')
    let descString
    // 如果Symbol的参数是一个对象，那么就会调用对象的toString方法
    descString = description === undefined ? descString = undefined : descString = String(description)

    let symbol = Object.create({
      toString: function () {
        return 'Symbol(' + this.__Description__ + ')';
      },
    });

    Object.defineProperties(symbol, {
      __Description__: {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
    })
    // 返回一个新对象，两个对象只要引用不同，那么就不会相等
    return symbol
  }
  const a = SymbolPolyfill('sss');
  const b = SymbolPolyfill('sss');
  console.log(a === b,);
  console.log(a.toString());
  console.log(SymbolPolyfill('sss'));
})()
