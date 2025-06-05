// coinCombo function - returns all combinations of coins for a given amount in cents
function coinCombo(amount) {
    if (amount < 0) return []; // No combinations for negative amounts
    
    const results = [];
    
    for (let dollars = 0; dollars <= Math.floor(amount / 100); dollars++) {
      for (let quarters = 0; quarters <= Math.floor((amount - dollars * 100) / 25); quarters++) {
        for (let halves = 0; halves <= Math.floor((amount - dollars * 100 - quarters * 25) / 50); halves++) {
          for (let dimes = 0; dimes <= Math.floor((amount - dollars * 100 - quarters * 25 - halves * 50) / 10); dimes++) {
            for (let nickels = 0; nickels <= Math.floor((amount - dollars * 100 - quarters * 25 - halves * 50 - dimes * 10) / 5); nickels++) {
              let pennies = amount - dollars * 100 - quarters * 25 - halves * 50 - dimes * 10 - nickels * 5;
              results.push({
                pennies,
                nickels,
                dimes,
                quarters,
                halves,
                dollars
              });
            }
          }
        }
      }
    }
  
    return results;
  }
  
  // coinValue function - returns the total value of coins in cents and dollars
  function coinValue(coinCounts) {
    const { pennies = 0, nickels = 0, dimes = 0, quarters = 0, halves = 0, dollars = 0 } = coinCounts;
  
    // Ensure that all values are numbers, if not, set them to 0
    const validCounts = {
      pennies: isNaN(pennies) ? 0 : Number(pennies),
      nickels: isNaN(nickels) ? 0 : Number(nickels),
      dimes: isNaN(dimes) ? 0 : Number(dimes),
      quarters: isNaN(quarters) ? 0 : Number(quarters),
      halves: isNaN(halves) ? 0 : Number(halves),
      dollars: isNaN(dollars) ? 0 : Number(dollars),
    };
  
    const totalCents = validCounts.pennies + validCounts.nickels * 5 + validCounts.dimes * 10 + validCounts.quarters * 25 + validCounts.halves * 50 + validCounts.dollars * 100;
    const totalDollars = (totalCents / 100).toFixed(2); // Convert cents to dollars
  
    return {
      coins: validCounts,
      totalCents,
      totalDollars
    };
  }
  
  /* Test for coinCombo
  console.log("===== Manual Tests for coinCombo() =====");
  
  let testAmount1 = 5;
  let testResult1 = coinCombo(testAmount1);
  console.log(`Test 1 - coinCombo(${testAmount1})`);
  console.log(`Expected combinations > 0, Actual: ${testResult1.length}`);
  console.log(testResult1);
  
  let testAmount2 = 0;
  let testResult2 = coinCombo(testAmount2);
  console.log(`Test 2 - coinCombo(${testAmount2})`);
  console.log(`Expected: 1 combination with all zeros`);
  console.log(testResult2);
  
  let testAmount3 = -5;
  let testResult3 = coinCombo(testAmount3);
  console.log(`Test 3 - coinCombo(${testAmount3})`);
  console.log(`Expected: 0 combinations`);
  console.log(testResult3);
  
  console.log("\n===== Manual Tests for coinValue() =====");
  
  let coinCounts1 = { pennies: 4, nickels: 1, dimes: 2, quarters: 1, halves: 0, dollars: 1 };
  let testResult4 = coinValue(coinCounts1);
  console.log(`Test 1 - coinValue({4p, 1n, 2d, 1q, 0h, 1$})`);
  console.log(`Expected cents: 4 + 5 + 20 + 25 + 0 + 100 = 154, Actual: ${testResult4.totalCents}`);
  console.log(`Actual: ${testResult4.totalDollars} ($${testResult4.totalDollars})`);
  
  let coinCounts2 = {};
  let testResult5 = coinValue(coinCounts2);
  console.log(`Test 2 - coinValue({})`);
  console.log(`Expected: 0 cents, Actual: ${testResult5.totalCents}`);
  console.log(`Actual: ${testResult5.totalDollars} ($${testResult5.totalDollars})`);
  
  console.log("\n===== Manual Tests for coinValue() =====");

  let coinCounts3 = { pennies: 10, nickels: 10, dimes: 100, quarters: 0, halves: 0, dollars: 0 };
  let testResult6 = coinValue(coinCounts3);
  console.log(`Test 3 - coinValue({10p, 10n, 100d, 0q, 0h, 0$})`);
  console.log(`Expected cents: 10 + 50 + 1000 = 1060, Actual: ${testResult6.totalCents}`);
  console.log(`Actual: ${testResult6.totalDollars} ($${testResult6.totalDollars})`);
  */

  module.exports = { coinCombo, coinValue };
