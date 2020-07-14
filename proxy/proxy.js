// 用来实现对象属性的保护
{
    // ES3
    function Person() {
        var person = {
            name : 'kitetop',
            age : 24,
            sex : 1
        }

        // Object.keys() 是ES5新增的， hasOwnProperty是ES3就有的，比较好用
        this.get = function(key) {
            if (person.hasOwnProperty(key)) {
                return person[key];
            } else {
                throw false;
            }
        }

        this.set = function(key, value) {
            if (person.hasOwnProperty(key) && key !== 'sex') {
                person[key] = value;
            } else {
                throw false;
            }
        }
    }
    var person = new Person();
    console.table({
        name: person.get('name'),
        age: person.get('age'),
        sex: person.get('sex')
    });

    
    try {
        person.set('name', 'null');
        person.set('age', 18);
        person.set('sex', 0);
    } catch(e) {
        // e 的内容会等于throw 抛出的内容， 此处等于 false
        console.log(e);
    } finally {
        console.table({
            name: person.get('name'),
            age: person.get('age'),
            sex: person.get('sex')
        });
    }
}

{
    // ES5
    let person = {
        name: 'kitetop',
        age: 24
    };
    // ES5 新增的方法，用来定义或者修改一个新的属性
    Object.defineProperty(person, 'sex', {
        writable: false,
        value: 1
    });
    // 推荐使用这种方式进行修改或者定义一个对象的新的属性
    Object.defineProperties(person, {
        name: {
            writable: false,
            value: 'kite'
        }
    })

    console.table({
        name: person.name,
        age: person.age,
        sex: person.sex
    });

    
    try {
        person.name = 'null';
        person.age = 18;
        person.sex = 0;
    } catch(e) {
        // e 的内容会等于throw 抛出的内容， 此处等于 false
        console.log(e);
    } finally {
        console.table({
            name: person.name,
            age: person.age,
            sex: person.sex
        });
    }
}

{
    // ES6
    let person = {
        name: 'kitetop',
        age: 24,
        sex: 1
    }

    let result = new Proxy(person, {
        get: (target, key) => {
            if (target.hasOwnProperty(key)) {
                return target[key];
            }
            return null;
        },
        set: (target, key, value) => {
            if (target.hasOwnProperty(key) && key !== 'sex') {
                target[key] = value;
            } else {
                throw false;
            }
        }
    });
    /** 对于try catch 语句，只要try内部一个语句出错throw了异常，那么try语句块的剩余内容就不会
        继续执行下去了 */
    try {
        result.name = 'null';
        result.age = 18;
        result.sex = 0;
    } catch(e) {
        // e 的内容会等于throw 抛出的内容， 此处等于 false
        console.log(e, 'ES6 proxy');
    } finally {
        console.table({
            name: result.name,
            age: result.age,
            sex: result.sex
        });
    }
}