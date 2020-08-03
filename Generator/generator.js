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
    var su; var err;
    function httpPromise(url) {
        /** 
         * setTimeout方法是定时程序，执行一次之后就不会在继续执行；
         * setInterval方法则是间隔一定时间反复执行某些事；
         * 定时器需要手动清除（tips：定时器即使清除了，其返回值也不会清除，之后设置的定时器的返回值会在返回值的
         * 基础上继续往后排）
         */    
        return new Promise((resolve, rejects) => {
            if (url) {
                su = setInterval(() => {
                    console.log(url, 'i+++');
                    resolve(url);
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

    httpPromise('/test1').then(res => {
        return httpPromise('/test2')
    }).then(res => {
        return httpPromise();
    }).catch(e => {
        console.log(e);
        console.log(su, 'window.su');
        console.log(err, 'window.err');
        clearTimeout(err);
        console.log(err, 'window.err');
    });
    console.log(su, 'window.su');
    console.log(err, 'window.err');
}