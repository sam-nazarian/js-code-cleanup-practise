'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'saman' },
  { value: -45, description: 'Groceries 🥑', user: 'saman' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'saman' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'saman' },
  { value: -1100, description: 'New iPhone 📱', user: 'saman' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'saman' },
]);

// budget[0].value = 100000; //freeze only works on 1st level, doesn't freeze depth

const spendingLimits = Object.freeze({
  saman: 1500,
  matilda: 100,
});
spendingLimits.jay = 200;

console.log(spendingLimits);

// in functional programming can't have it accessing data from the outer scope
const getLimit = (limits, user) => limits?.[user] ?? 0; //if undefined val is going to be 

// Pure function
const addExpense = function (state, limits, value, description, user='saman') {
  const cleanUser = user.toLowerCase(); //not changing parameters directly
  return value <= getLimit(limits, cleanUser) ? [...state, {value: -value, description, user: cleanUser}] : state;
};

//in real world we would need composing or technique called currying
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

/*
const checkExpenses = function (state, limits) {
  //map not mutating, instead creating a new arr
  return state.map(entry => {
    return (entry.value < -getLimit(limits, entry.user)) ? {...entry, flag: 'limit'} : entry
    // if (entry.value < -getLimit(limits, entry.user)) return entry.flag = 'limit'; //doesn't work as map does not automatically have a default val
  })
};
*/

// shortened version of func above, arrow funcs mean that it's returning, map not mutating, instead creating a new arr
const checkExpenses = (state, limits) => state.map(entry => (entry.value < -getLimit(limits, entry.user)) ? {...entry, flag: 'limit'} : entry);

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

/*
const logBigExpenses = function (bigLimit) { 
  let output = '';
  for (const entry of budget)
    output+= entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    // if (entry.value <= -bigLimit) {
    //   // output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
    //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    // }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
*/

// Impure because of console.log()
const logBigExpenses = function (state, bigLimit) { 
  const bigExpenses = state.filter(entry => entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join(' / ')
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
  console.log(bigExpenses);
}

logBigExpenses(finalBudget,500)

//not hard rules, general guidelines
//in functional programming we try to minimize the side effects as much as possible