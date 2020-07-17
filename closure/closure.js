{
    // 使用闭包定义私有变量
    const User = (function() {
        let _password;
        const User = function(name, password) {
            this.name = name;
            // 此处存在当前作用域不存在往上一层作用域探头的情况
            _password = password;
        }
        return User;
    })();

    const user = new User('kitetop', 'password');
    console.log(user.name, 'user Object===');
    // 不管是password 还是_password 都访问不了
    console.log(user.password, 'user Object===');
    console.log(user._password, 'user Object====');
}

{
    function test() {
        var num = [];i
        var i;
        for (i = 0; i < 10; i++) {
            num[i] = function() {
                console.log(i);
            }
        }
        return num[9];
    }
    // 对于test(), 它返回的是一个函数 functio() { console.log(i) }
    // test()() 就是执行这个函数，但是对于这个函数而言，它的作用域并没有i这个变量，因此它会在上一层作用域去寻找i的值，当
    // 循环完毕之后，i的值变成了10
    test()();
    // 输出 10
}

{
    var test = (function() {
        var num = 0;
        this.get = () => {
            return num;
        }
        return function () {
            this.name = num;
            return num++;
        }
    })();
    for (var i = 0; i < 10; i++) {
        test();
    }
    // console.log(test(), 'top===');
    // 此处也等于执行了一次 test()
    const t = new test();
    console.log(test(), 'bottom===');
    // 输出11
    console.log(t.name, 'name===');
    // 输出10；
}
