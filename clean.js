const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'saman' },
  { value: -45, description: 'Groceries 🥑', user: 'saman' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'saman' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'saman' },
  { value: -1100, description: 'New iPhone 📱', user: 'saman' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'saman' },
];

const spendingLimits = {
  saman: 1500,
  matilda: 100,
};

const getLimit = user => spendingLimits?.[user] ?? 0; //if undefined val is going to be 

const addExpense = function (value, description, user='saman') {
  if (!user) user = 'saman';
  // user = user.toLowerCase();
  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;
  // const limit = getLimit(user);

  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function () {
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
    // let lim;
    // if (spendingLimits[entry.user]) {
    //   lim = spendingLimits[entry.user];
    // } else {
    //   lim = 0;
    // }
    // const limit = spendingLimits?.[entry.user] ?? 0;
};
checkExpenses();
console.log(budget);

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
logBigExpenses(500)