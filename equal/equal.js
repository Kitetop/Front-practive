{
    // 对于object 都会先转换成数字
    // 数组如果有值，那么会转换成数组内部的第一个值，空数组则转换成0
    // 对象依靠valueOf 或者 toString 方法进行转换
    // 字符串若是不能转成number，则会转成 NaN， NaN和任何都不相等
    console.log(![] == []);
    console.log(![] === [])
}

{
    // 类型相同的Object类型
    // 和基础类型比较一致
    let a = {}, b = {a: 1};
    console.log(a == b, '内存地址不一样');
    console.log(a === b, '内存地址不一样');
    a = b;
    console.log(a == b, '内存地址一样');
    console.log(a === b, '内存地址一样');
}

{
    // 对于null 和 undefined
    console.log(null == undefined, 'null 和undefined相比较');
    // 但是因为基本类型不一样，因此使用三等号则是不相等
    console.log(null === undefined, 'null 和undefined相比较')
}