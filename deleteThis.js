// const testPromise = new Promise((res, rej) => {
//     setTimeout(() => {
//         rej("complete with");
//     }, 1000);
// });
// console.log('start');

// testPromise
// .then(e => console.log(`${e} resolve`))
// .catch(e => console.log(`${e} reject`))

// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//           const a = 243562 + 43525;
//         resolve(`resolved ${a}`);
//       }, 2000);
//     });
//   };

//   async function asyncCall() {
//     console.log('calling');
//     const result = await resolveAfter2Seconds();
//     console.log(result);
//     // expected output: "resolved"
//   }

//   asyncCall();

// let a = 0b110011;
// console.log(a.toString(2));
// a = (a << 2);
// console.log(a.toString(2));

// console.log(7 | 1);

// for( let i = 0 ; i < 42 ; ++i ) {
//     if((i & 1) === 1) console.log(i);
//     // console.log(~i);
// };

// const a = -5;
// console.log(a.toString(2));

// let map = new Map();
// map.set('k1', 'v1').set('k2', 'v2');

// console.log(map.get('k1'));
// console.log(map.has('k2'));

// for ( let el of map.entries()) {
// console.log(el[0] + " " + el[1]);
// }

// console.log(map.entries());
// console.log(map);
// String.prototype.returnMe= function() {
//     return this;
// }

// var a = "abc";
// var b = a.returnMe();  
//  console.log(b);

// var a = Boolean(" ");
// console.log(a);
//  let a = null;
//  a = !a
//  console.log(a);

// const a = ["aaa", "AAA"];
// const b = ["bbb", "BBB"];
// const c = a.concat(b);
// console.log(c);

// const o = {
//     Name: {
//         value: "o"
//     },
//     val: 1
// };

// const a = o;

// console.log(o);
// console.log(a);
// a.Name = {}
// o.val = 2;
// console.log(o);
// console.log(a);
// a.val = 3;
// console.log(o);
// console.log(a);

// let obj = {
//     a: {
//         name: "a"
//     },
//     b: {
//         name: "b"
//     }
// };
// console.log(obj);
// // { a: { name: 'a' }, b: { name: 'b' } }

// let instance = obj.a;
// instance.test = 3;
// console.log(obj.a);
// // { name: 'a', test: 3 }

// obj.a = {};

// // {}

// console.log(instance);
// // { name: 'a', test: 3 }

// console.log(obj);
// // { a: {}, b: { name: 'b' } }

// let val = obj.b.name

// val = "asdjashdkadhjsad"
// console.log(obj.b.name);

// class A {
//     get pesho() {
//         if(this._pesho == null) {
//             this._pesho = 12;
//         } 
//         return this._pesho;
//     }
// };

// function foo() {
//     // this.a = "saascdwsdv";
//     a = 'bbb';
//     // console.log(a);
// };

// foo();
// this.a = 'aaa';
// console.log(this.a);


// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
//     speak() {
//         console.log(this.name + 'makes a noise');
//     }
// }
// class Lion extends Animal {
//     speak() {
//         console.log(this.name + ' roars');
//     }
// }
// let lion = new Lion('King')
// lion.speak();


// const a = "1" - 2 + 3 + 1 + 1 + 1 + 1
// console.log(a);
const arr = [0, 0, 0, 0];
for (let i = 0; i < 10000; ++i) {
    const choose = Math.floor(Math.random() * 4);
    arr[choose]++;
};
console.log(arr);