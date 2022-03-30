
 /************************************************************************************************************************************
 * 1381. 设计一个支持增量操作的栈
 * 实现自定义栈类 CustomStack ：
 *     CustomStack(int maxSize)：用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。
 *     void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
 *     int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
 *     void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。
 ************************************************************************************************************************************
 */

 /**
 * @param {number} maxSize
 */
  var CustomStack = function(maxSize) {
    this.maxSize = maxSize;
    this.stack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
    if (this.stack.length >= this.maxSize) {
        return;
    }
    this.stack.push(x);
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
    return this.stack.length ? this.stack.pop() : -1;
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
    // 注意：当有增量时，取栈中的每个元素加上增量的值再次存入栈中
    let length = this.stack.length > k ? k : this.stack.length;
    for (let i = 0; i < length; i++) {
        this.stack[i] += val;
    }
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */

/*****************************************************************************
 * 实现`Promise.allSettled()`
 * https://bigfrontend.dev/zh/problem/implement-Promise-allSettled
 *****************************************************************************
 */
/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
 function allSettled(promises) {
  if (promises.length === 0) return Promise.resolve([])
  
  const _promises = promises.map(
    item => item instanceof Promise ? item : Promise.resolve(item)
    )
  
  return new Promise((resolve, reject) => {
    const result = []
    let unSettledPromiseCount = _promises.length
    
    _promises.forEach((promise, index) => {
      promise.then((value) => {
        result[index] = {
          status: 'fulfilled',
          value
        }
        
        unSettledPromiseCount -= 1
        // resolve after all are settled
        if (unSettledPromiseCount === 0) {
          resolve(result)
        }
      }, (reason) => {
        result[index] = {
          status: 'rejected',
          reason
        }
        
        unSettledPromiseCount -= 1
        // resolve after all are settled
        if (unSettledPromiseCount === 0) {
          resolve(result)
        }
      })
    })
  })
}

