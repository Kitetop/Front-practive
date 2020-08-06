{
    console.log(1); // 1
    let one = setTimeout(() => {
        console.log(2); // 6
        clearTimeout(one);
    }, 0);
    (new Promise((resolve, reject) => {
        console.log(3); // 2
        let two = setTimeout(() => {
            console.log(4); // 7
            clearTimeout(two);
        }, 0);
        (new Promise(res => {
            console.log(5); // 3
            res(6);
        })).then(res => {
            console.log(res); // 4
            resolve(7);
        });
    }).then(res => {
        console.log(res);
    }));
    // 1
    // 3
    // 5
    // 6
    // 7
    // 2
    // 4
}

{
    console.log(1);
    let two = setTimeout(() => {
        console.log(5);
        clearTimeout(two);
    }, 0);
    (new Promise(resolve => {
        console.log(2);
        let one = setTimeout(() => {
            resolve(4);
            console.log(3);
            clearTimeout(one);
        }, 100);
    })).then(res => {
        console.log(res);
    });
    // 1,2,5,3,4
}
{
    console.log(1);
    let two = setTimeout(() => {
        console.log(5);
        clearTimeout(two);
    }, 0);
    (new Promise(resolve => {
        console.log(2);
        let one = setTimeout(() => {
            console.log(3);
            clearTimeout(one);
        }, 0);
        resolve(4);
    })).then(res => {
        console.log(res);
    });
    // 1, 2, 4, 5, 3 
}

{
    console.log(1);
    let two = setTimeout(() => {
        console.log(2);
        clearTimeout(two);
    }, 0);
    (new Promise(resolve => {
        console.log(3);
        let time = 0;
        for(let i = 0; i < 1000000000; i++) {
            time += i;
        }
        console.log(time);
        resolve(5);
    })).then(res => {
        console.log(res);
    })
    
}

/*----------------------------------------------------------------------------------------------------------------------------------
 * 宏任务： setInterval()、setTimeout()、setImmediate(Node独有)、requestAnimationFrame(浏览器独有)、I/O、UI rendering(浏览器独有)
 * 微任务： new Promise()、new MutaionObserver()、process.nextTick(Node独有)、Object.observe
 * 主线程空闲的时候就会先去查看微任务队列是否有事件存在
 * 如果存在就会对微任务队列依次调用，然后其宏任务队列依次执行
 * Tips：对于先后分析，应该从同一个块上面去分析(它会把整块根据性质放入所属队列，而不会去考虑其内部有啥队列)，然后把各个
 * 任务塞入各自队列中。微任务永远在宏任务之前执行,微任务要是没有执行完，那么就不会向下执行宏任务
 *----------------------------------------------------------------------------------------------------------------------------------*/ 