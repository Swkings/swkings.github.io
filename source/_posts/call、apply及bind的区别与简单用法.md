---
title: call、apply及bind的区别与简单用法
tags:
  - call
  - apply
  - bind
categories:
  - 前端
  - JS
comments: true
abbrlink: 21375dac
date: 2018-04-04 11:24:30
---

---

call、apply及bind的来源
---
call、apply及bind都是继承自Function.prototype，而普通对象、函数和数组继承自Function.prototype，所以call()、apply()及bind()可以在Function、Array及Object中使用

```
console.log(Function.prototype.hasOwnProperty('call'))  //true
console.log(Function.prototype.hasOwnProperty('apply'))  //true
console.log(Function.prototype.hasOwnProperty('bind'))  //true

console.log(Function.prototype.isPrototypeOf(Function))  //true
console.log(Function.prototype.isPrototypeOf(Array))  //true
console.log(Function.prototype.isPrototypeOf(Object))  //true
```

call、apply及bind的区别
---
1、三个方法都是指定函数内部this指向的作用域
2、第一个参数都是指定函数运行的作用域
3、call、bind传入参数列表，apply传入参数数组（也可传入arguments）
4、call，apply方法是在调用之后立即执行函数，而bind方法没有立即执行，需要将函数再执行一遍。

call
---
call()可以指定该函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。并且会立即执行该函数。
**语法格式： fn.call(obj,arg1,arg2...)**
```
function  Obj() {}
Obj.prototype = {
    name: 'peo_test',
    age: 100,
    introduction: function(arg1, arg2){
        alert('我叫：' + this.name + ' 今年' + this.age + '岁了!');
        alert('我知道 ' + arg1 + '+' + arg2 + '=' + (arg1 + arg2) + '!');
    }
}
var  Peo1  = {
    name:  '小明',
    age:  20
};
var  Peo2  = {
    name:  '小华',
    age:  22
};
var p = new Obj();
p.introduction(2, 3); //我叫：peo_test 今年100岁了! 我知道 2+3=5!
p.introduction.call(Peo1, 22, 33); //我叫：小明 今年20岁了! 我知道 22+33=55!
p.introduction.call(Peo2, 222, 333); //我叫：小华 今年22岁了! 我知道 222+333=555!

/*
    运行如下：
        a):fn函数中的this--->Peo
        b):运行fn(arg1,arg2...);
*/
```

apply
---

apply与call类似，区别是apply()接收一个数组作为函数执行时的参数。
**语法格式： fn.apply(obj,[arg1,arg2]...)**

```
function  Obj() {}
Obj.prototype = {
    name: 'peo_test',
    age: 100,
    introduction: function(arg1, arg2){
        alert('我叫：' + this.name + ' 今年' + this.age + '岁了!');
        alert('我知道 ' + arg1 + '+' + arg2 + '=' + (arg1 + arg2) + '!');
    }
}
var  Peo1  = {
    name:  '小明',
    age:  20
};
var  Peo2  = {
    name:  '小华',
    age:  22
};
var p = new Obj();
p.introduction(2, 3); //我叫：peo_test 今年100岁了! 我知道 2+3=5!
p.introduction.apply(Peo1, [22, 33]); //我叫：小明 今年20岁了! 我知道 22+33=55!
p.introduction.apply(Peo2, [222, 333]); //我叫：小华 今年22岁了! 我知道 222+333=555!
```

bind
---
bind()指定函数内部的this指定的作用域，然后返回一个新函数。**且不立即执行**
**语法格式： fn.bind(obj)(arg1,arg2)**

```
function  Obj() {}
Obj.prototype = {
    name: 'peo_test',
    age: 100,
    introduction: function(arg1, arg2){
        alert('我叫：' + this.name + ' 今年' + this.age + '岁了!');
        alert('我知道 ' + arg1 + '+' + arg2 + '=' + (arg1 + arg2) + '!');
    }
}
var  Peo1  = {
    name:  '小明',
    age:  20
};
var  Peo2  = {
    name:  '小华',
    age:  22
};
var p = new Obj();
p.introduction(2, 3); //我叫：peo_test 今年100岁了! 我知道 2+3=5!
p.introduction.bind(Peo1)(22, 33); //我叫：小明 今年20岁了! 我知道 22+33=55!
p.introduction.bind(Peo2)(222, 333); //我叫：小华 今年22岁了! 我知道 222+333=555!
```
**注：链式绑定只有第一个有效**
```
p.introduction.bind(Peo1).bind(Peo2)(22, 33); //我叫：小明 今年20岁了! 我知道 22+33=55!
```

---

