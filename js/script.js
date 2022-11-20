"use strict";
// Завдання № 1
// myNewFunc.call(myNewFunc);

// function myNewFunc() {
//     alert(this);
// }

// // Что выведет код?
// Відповідь: код функции myNewFunc


// Завдання № 2

// let a = 1;
// let b = { toString() { return '1' } };
// let c = 1;

// Чему равно a + b + c ?

//     Відповідь : 111;

// // Завдання № 3

// for (let i = 1; i < 10; i++) {
//     setTimeout(function () {
//         alert(i);
//     }, 100);
// }
// //     Відповідь : числа від 0 до 9;

// // Завдання № 4

// function F() { };

// Объявлена функция.Чем является F.prototype ?
    
//     Відповідь: ЗВИЧАЙНИМ об"єктом

// "JavaScript is awesome".toUpperCase();
// const yearOfBirth = 2006;
// console.log(yearOfBirth);
// // Змінним, оголошеним через let, не обов'язково одразу присвоювати значення.
// let age;

// // Якщо змінній, оголошеній як let, не було присвоєно значення,
// // вона ініціалізується спеціальним значенням undefined (не визначено).
// console.log(age); // undefined

// // console.log() - це метод для виведення даних у консоль браузера,
// // пізніше познайомимось з ним детальніше.

// // Якщо змінна оголошена як let, її значення можна перезаписати.
// age = 14;
// console.log(age); // 14
// let username;
// console.log(typeof username); // "undefined"

// let inputValue = null;
// console.log(typeof inputValue); // "object"

// const quantity = 17;
// console.log(typeof quantity); // "number"

// const message = "JavaScript is awesome!";
// console.log(typeof message); // "string"

// const isSidebarOpen = false;
// console.log(typeof isSidebarOpen); // "boolean"
// const x = 5;
// const y = 10;
// const z = 5;

// console.log("x > y:", x > y); // false
// console.log("x < y:", x < y); // true
// console.log("x < z:", x < z); // false
// console.log("x <= z:", x <= z); // true
// console.log("x === y:", x === y); // false
// console.log("x === z:", x === z); // true
// console.log("x !== y:", x !== y); // true
// console.log("x !== z:", x !== z); // false

// Завдання № 5

// function A() { };
// function B() { };

// A.prototype = B.prototype = {};

// let a = new A();

// console.log(a instanceof B);

// Что будет выведено в консоль?
// true

// Завдання № 6
// Задача: 
// Есть ферма животных, у всех животных есть имена и возраст. Животные бывают разных типов: Кошки, Собаки, Коровы. У каждого животного могут быть дети. Если животное является родителем этих детей, в свою очередь глубина семейного древа может достигать N либо 0.

// Опишите структуры данных для фермы животных и напишите функцию, которая делает подсчёт всех возрастов животных и выводит общий возраст для всей фермы.
// // Решение: 
// Родительский класс для всех животных
class Animal {
 constructor(name, age, childs = null) {
   this.name = name;
   this.age = age;
   this.childs = childs;
 }
}

// Класс Cat - потомок класса Animal
// Имеет те же поля, что и Animal
class Cat extends Animal {
 constructor(name, age, childs = null) {
   super(name, age, childs);
 }
}

// Класс Dog - потомок класса Animal
// Имеет те же поля, что и Animal
class Dog extends Animal {
 constructor(name, age, childs = null) {
   super(name, age, childs);
 }
}

// Класс Cow - потомок класса Animal
// Имеет те же поля, что и Animal
class Cow extends Animal {
 constructor(name, age, childs = null) {
   super(name, age, childs);
 }
}

// Рекурсивная функция для подсчета age
// Обходит все дочерние элементы
function getAnimalsAge(animals) {
 let output = 0;

 if (animals.length > 0) {
   // Использование функции reduce для получения общего age
   // https://learn.javascript.ru/array-iteration
   output += animals.reduce((acc, current) => {
     // Сумма age всех childs
     let count = 0;
     // Если childs пустой или его нет, тогда нет смысла пробегать по ним
     if (current.childs && current.childs.length > 0) {
       // Применение рекурсии
       count += getAnimalsAge(current.childs);
     }

     // Возвращаем сумму аккумулятора, текущего животного, сумму age всех childs
     return acc + current.age + count;
   }, 0);
 }

 return output;
}

// Функция для получения определённого количества животных
function generateAnimals(type, count) {
 let output = [];

 for (let i = 0; i <= count; i++) {
   let parameter = {
     name: ${type} ${i},
     age: i,
     childs: []
   };

   let item = null;

   switch (type) {
     case "Cat":
       item = new Cat(parameter.name, parameter.age);
       break;
     case "Dog":
       item = new Dog(parameter.name, parameter.age);
       break;
     case "Cow":
       item = new Cow(parameter.name, parameter.age);
       break;
   }

   if (item) {
     output.push(item);
   }
 }

 return output;
}

// Добавление childs ко всем переданным животным
function addChildsTo(animals, count, type) {
 animals.forEach(animal => {
   if (!animal.childs) {
     animal.childs = [];
   }
   // Обратите внимание, что массив - ссылка, поэтому изменяя здесь его поля
   // мы меняем их глобально
   animal.childs = generateAnimals(type, count);
 });
}

let cats = generateAnimals("Cat", 5);
addChildsTo(cats, 10, "Cat");

let dogs = generateAnimals("Dog", 3);
addChildsTo(dogs, 3, "Dog");

let cows = generateAnimals("Cow", 7);
addChildsTo(cows, 1, "Dog");

// Использование оператора Spread (ES6)
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax
let animals = [...cats, ...dogs, ...cows];

console.log(getAnimalsAge(animals)) // 411