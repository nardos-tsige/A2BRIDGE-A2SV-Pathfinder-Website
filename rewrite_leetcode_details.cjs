const fs = require('fs');

const chunk1 = JSON.parse(fs.readFileSync('chunk1.json', 'utf-8'));
const chunk2 = JSON.parse(fs.readFileSync('chunk2.json', 'utf-8'));
const chunk3 = JSON.parse(fs.readFileSync('chunk3.json', 'utf-8'));
const chunk4 = JSON.parse(fs.readFileSync('chunk4.json', 'utf-8'));

const lastTwo = {
  "Coin Change II": {
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.",
    explanation: "Use dynamic programming. dp[i] is the number of combinations to make up amount i. Initialize dp[0] to 1. For each coin, iterate from the coin's value to the target amount, adding the number of combinations for the remaining amount.",
    implementation: "class Solution:\n    def change(self, amount: int, coins: List[int]) -> int:\n        dp = [0] * (amount + 1)\n        dp[0] = 1\n        for i in range(len(coins) - 1, -1, -1):\n            nextDP = [0] * (amount + 1)\n            nextDP[0] = 1\n            for a in range(1, amount + 1):\n                nextDP[a] = dp[a]\n                if a - coins[i] >= 0:\n                    nextDP[a] += nextDP[a - coins[i]]\n            dp = nextDP\n        return dp[amount]"
  },
  "Best Time to Buy and Sell Stock with Cooldown": {
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions: After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).",
    explanation: "Use dynamic programming with state machine. Three states: held (holding a stock), sold (just sold a stock, entering cooldown), and reset (not holding, not in cooldown). Update the states based on the previous states and the current price.",
    implementation: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        dp = {}\n        def dfs(i, buying):\n            if i >= len(prices): return 0\n            if (i, buying) in dp: return dp[(i, buying)]\n            cooldown = dfs(i + 1, buying)\n            if buying:\n                buy = dfs(i + 1, not buying) - prices[i]\n                dp[(i, buying)] = max(buy, cooldown)\n            else:\n                sell = dfs(i + 2, not buying) + prices[i]\n                dp[(i, buying)] = max(sell, cooldown)\n            return dp[(i, buying)]\n        return dfs(0, True)"
  }
};

const allProblems = { ...chunk1, ...chunk2, ...chunk3, ...chunk4, ...lastTwo };

let newContent = `export const LEETCODE_DETAILS: Record<string, { description: string; explanation: string; implementation: string }> = {\n`;

for (const [title, details] of Object.entries(allProblems)) {
  newContent += `  "${title}": {\n`;
  newContent += `    description: ${JSON.stringify(details.description || "Description not available.")},\n`;
  newContent += `    explanation: ${JSON.stringify(details.explanation)},\n`;
  newContent += `    implementation: ${JSON.stringify(details.implementation)}\n`;
  newContent += `  },\n`;
}

newContent = newContent.replace(/,\n$/, '\n');
newContent += '};\n';

fs.writeFileSync('./src/data/leetcodeDetails.ts', newContent);
console.log(`Successfully wrote ${Object.keys(allProblems).length} problems to leetcodeDetails.ts`);
