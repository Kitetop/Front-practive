{
    let Person = function() {
        this.age = 18;
    }

    Person.prototype.age = 24;
    Person.prototype.name = 'kitetop';
    let person = new Person();
    /**
     * 构造函数的属性是直接挂载在实例上的；
     * 原型链上的属性属于原型链;
     * 如果访问一个属性，构造函数该属性上存在，那么直接返回构造函数上的属性，若是不存在，那么会去原型链上寻找
     */
    console.log(person, 'persion');
    console.log(person.age, '直接在本对象下寻找'); // 18
    console.log(person.__proto__.age, '去原型链上查找'); // 24
    console.log(person.name, '去原型链上查找'); // kitetop
}

{
    let Person = function() {}
    Person.prototype.name = 'kitetop';
    let a = new Person();
    console.log(a, 'object a===');
    /**
     * 此处等于给prototype重新赋值，此时prototype的指向已经发生了变化
     */
    Person.prototype = {
        name: 'null',
        age: 19
    }
    let b = new Person();
    console.log(b, 'object b===');
    console.log(a.name, 'a.name==='); // kitetop
    console.log(a.age, 'a.age==='); // undefined
    console.log(b.name, 'b.name==='); // null
    console.log(b.age, 'b.age==='); // 19
}

{
    let Person = function() {}
    Person.prototype.name = 'kitetop';
    let a = new Person();
    /**
     * 此处并没有给prototype重新赋值，它的指向并没有发生改变
     */
    Person.prototype.name = 'null';
    Person.prototype.age = '19'
    let b = new Person();
    console.log(a, 'object a===');
    console.log(b, 'object b===');
    console.log(a.name, 'a.name==='); // null
    console.log(a.age, 'a.age==='); // 19
    console.log(b.name, 'b.name==='); // null
    console.log(b.age, 'b.age==='); // 19
}
{
    // 自有属性与原型继承属性
    function A () {
        this.name = 'A';
        this.color = ['A']
    }

    function B() {};
    B.prototype = new A();
    let b1 = new B();
    let b2 = new B();
    /**
     * 对于沿着原型链去查询值仅仅只会发生在'读'的操作之中；
     * 对于写操作，它会直接在当前对象上去创建这个值；
     * 对于不是直接要替换引用的写操作，如b1.color.push() | b1.color.attr = 'xxx'，它走的是原型链查询 + 修改流程
     */
    b1.name = 'change';
    b1.color.push('b1');
    console.log(b1.name, 'b1_name'); // change
    console.log(b2.name, 'b2_name'); // A
    console.log(b1.color, 'b1_color'); // [A, b1]
    console.log(b2.color, 'b2_color'); // 
    b1.color = ['change'];
    console.log(b1, 'b1_obejct');
    console.log(b2, 'b2_obejct');
    console.log(b1.color, 'b1_color'); // [change]
    console.log(b2.color, 'b2_color'); // [A, b1]
}