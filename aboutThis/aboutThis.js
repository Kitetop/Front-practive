var number = 5;
var obj = {
    number: 3,
    fn1: (function () {
        var number;
        this.number *= 2; // 5 * 2 = 10;
        number = number * 2;
        console.log(this.number, 'test====');
        number = 3;
        return function () {
            var num = this.number;
            this.number *= 2;
            console.log(num, 'this.number');
            number *= 3;
            console.log(number, 'father number');
        }
    })() // 在调用时相当于普通函数执行，因此其this指向全局的window
}
var fn1 = obj.fn1; // 等于普通函数执行，this指向window， 此时window.number = 10;
fn1.call(null); // 默认绑定规则 => num = 全局下的number = 10, number的值则要去上一层作用域去寻找， 3 * 3 = 9；此时window.number = 20
let test = new fn1(); // this是函数自身的this，并没有this.number的值，因此是undefined
obj.fn1(); // 调用方式， this.number等于obj的number = 3， num = 3; number = 3 * 9 = 27; 此时obj.number = 6
console.log(window.number, 'window number = 20');
console.log(obj.number, 'object_number = 6');
/**
 * 补充：
 * 不管方法被书写在什么位置，它的this指向只跟着调用方法
 * | 特殊情况（100%指向全局window）
 *   | 立即执行函数
 *   | setTimeout中传入的函数
 *   | setInterval中传入的函数
 */
