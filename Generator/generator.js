{
    function* demo() {
        /**
         * 如果yield表达式如果在另一个表达式之间，必须放在圆括号之间，否则会报错；
         * 若是用作函数参数或者赋值表达式的右边，那么则可以不加括号
         */
        // console.log('hello' + yield 123); // SyntaxError
        console.log('hello' + (yield 123));
        foo(yield 'a', yield 'b');
        let input = yield;
    }
}

{
    let iterable = {};
    iterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    }
    console.log(iterable, 'iterable==='); // {Symbol(Symbol.iterator): f}
    console.log([...iterable], '[...iterable]'); // [1, 2, 3]
}

{
    /**
     * yield 表达式本身没有返回值，或者说总是返回undefined
     * next方法可以带一个参数，该参数会被当做上一个yield表达式的值 
     */
    function* foo(x) {
        // 若是next不传入值，那么这个表达式的值会变成NaN, 因为yield表达式本身并没有值
        let y = 2 * (yield (x + 2));
        let z = yield (y / 3);
        return (x + y + z);
    }

    let run = foo(10);
    let a = run.next(); // 执行到(x + 2)就结束，直接返回值：12
    console.log(a, 'a===');
    let b = run.next(30); // 继续向下执行，替换 yield (x + 2)的值，进行2 * 30 的运算， 此时y = 60; 继续向下执行yield (y / 3), 返回这个表达式的值： 20 
    console.log(b, 'b===');
    let c = run.next(13); // 继续向下执行，替换yield (y / 3)的值，此时z = 13，返回(x + y + z)的值： 10 + 60 + 13 = 83
    console.log(c, 'c===');
}

{
    function httpPromise(url) {
        /** 
         * setTimeout方法是定时程序，执行一次之后就不会在继续执行；
         * setInterval方法则是间隔一定时间反复执行某些事；
         * 定时器需要手动清除（tips：定时器即使清除了，其返回值也不会清除，之后设置的定时器的返回值会在返回值的
         * 基础上继续往后排）
         */
        var su; var err;
        return new Promise((resolve, rejects) => {
            if (url) {
                su = setInterval(() => {
                    console.log(url, 'i+++');
                    resolve(url);
                    // 两个可以相互混用，但是不建议
                    clearTimeout(su);
                }, 3000)
            } else {
                err = setTimeout(() => {
                    rejects(false);
                    clearTimeout(err);
                }, 3000)
            }
        });
    }

    /**
     * 使用Promise解决异步问题；
     * Promise的错误是需要通过回调函数捕获， try catch是行不通的, 而async/await和generator允许
     */
    httpPromise('/test1').then(res => {
        return httpPromise('/test2')
    }).then(res => {
        return httpPromise();
    }).catch(e => {
        console.log(e);
    });

    /**
     * 使用Generation的方式解决异步问题
     */
    function* httpGenerator() {
        try {
            let res1 = yield httpPromise('/test1');
            console.log(res1, 'res1==');
            let res2 = yield httpPromise('/test2');
            console.log(res2, 'res2==');
            let res3 = yield httpPromise();
            console.log(res3, 'res3==');
        } catch (e) { }

    }
    function runGenerator(gen) {
        let it = gen(), ret;
        (function iterate(val) {
            ret = it.next(val);
            if (!ret.done) {
                if ('then' in ret.value) {
                    ret.value.then(res => iterate(res)).catch(e => {console.log(e)});
                } else {
                    throw false;
                }
            }
        })()
    }
    runGenerator(httpGenerator);
}
