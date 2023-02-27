let animals = ["a", "s", "v"];

let key = (animal) => animal === "salmon";

var sound = "s";
var bear = { sound: "roar" };

function roar() {
  console.log(this.sound);
}

roar.apply(bear);

let cat = { type: "tiger", size: "large" };

console.log(JSON.stringify(cat, ["type"]));

var obj;

console.log(obj);

var cat2 = { name: "athena" };

function swap(feline) {
  feline.name = "wild";
  feline = { name: "tabby" };
}

swap(cat2);
console.log(cat2.name);

const z = 6 % 2;
const y = z ? "one" : "two";

console.log(y);

let cat3 = { name: "paul" };

function dude(feline) {
  feline = { name: "" };
}

dude.bind(cat3);

console.log(cat3.prototype());
