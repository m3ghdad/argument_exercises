function sum(...numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

function sum2() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3, 4) === 10);
console.log(sum(1, 2, 3, 4, 5) === 15);


// simple myBind with no args
Function.prototype.myBind = function (ctx) {
  return () => this.apply(ctx);
};

Function.prototype.myBindArgs = function (ctx, ...args) {
  return(...callArgs) => {
    return this.apply(ctx, args.concat(callArgs));
  };
};

Function.prototype.myBindArgs2 = function (ctx) {
  const fn = this;
  const bindArgs = Array.from(arguments).slice(1);
  return function bound() {
    const callArgs = Array.from(arguments);
    return fn.apply(ctx, arguments.concat(callArgs));
  };
};


class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBindArgs(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBindArgs(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBindArgs(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBindArgs(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true


function curriedSum(numArgs) {
  let numbers = [];
  function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      //sums numbers in the array and return the result
      total = 0;

      for (let i = 0; i < numbers.length; i++) {
      total +=  numbers[i]
      }
      return total;
    }
    else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

const sumCurried = curriedSum(4);
console.log(sumCurried(5)(30)(20)(1));// => 56


Function.prototype.curry = function(numArgs) {
  //returns a function that collect up arguments until there are numArgs of them
  //if there are too few arguments still, it should return itself
  //when there are numArgs arguments, it should call the original function
  const collection = [];
  const fn = this;

  function _curried(collected) {
    collection.push(collected);
    if (collection.length == numArgs) {
      return fn(...collection)
    }
    else {
      return _curried;
    }
  }
  return _curried;
}

Function.prototype.curry2 = function(numArgs) {
  const collection = [];
  const fn = this;

  function _curried(collected) {
    collection.push(collected);
    if (collection.length === numArgs) {
      return fn.apply(null, collection);
    } else {
      return _curried;
    }
  }
  return _curried;
};
