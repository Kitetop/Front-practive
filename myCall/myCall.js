{
    /**
     * 这个是一个块级作用域，使用let会使得这个值只在这个块作用域生效
     * 使用var会变量提升，使得这个值绑定到window对象之下
     */
    var name = 'null';
    let me = {
        name: 'kitetop'
    };
    function showMyName(a, b, c) {
        console.log(a, b, c);
        console.log(this.name);
    }
    /**
     * Step1: 给要改变指向对象新增一个方法
     * Step2: 使得这个对象新增的方法等于调用myCall方法的对象
     * Step3: 删除给这个对象新增的方法
     */
    Function.prototype.myCall = function(context, ...arg) {
        // 此处的this等于调用myCall()的方法
        context.func = this;
        context.func(...arg);
        console.log(context, 'context====');
        delete context.func;
    }
    showMyName('a', 'b', 'c');
    console.log('--------------------------');
    showMyName.myCall(me,  'a', 'b', 'c');

    /**
     * bind方法参数使用和call一样，区别在于bind只是绑定this，而不是绑定加执行
     */
    Function.prototype.myBind = function(context, ...arg) {
        let that = this;
        return () => {
            that.myCall(context, ...arg);
        }
    }
    console.log('--------------------------');
    let bind = showMyName.myBind(me, 'a', 'b', 'c');
    console.log(bind);
    bind();
}