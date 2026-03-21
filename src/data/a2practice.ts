export interface A2Question {
  id: number;
  title: string;
  category: 'Basics' | 'Conditionals' | 'Strings' | 'Loops' | 'Lists' | 'Tuples & Sets' | 'Dictionaries' | 'Functions' | 'Algorithms';
  description: string;
  initialCode: string;
  solution: string;
  testCases: { input: any[]; expected: any }[];
}

export const A2_QUESTIONS: A2Question[] = [
  // Basics (1-5)
  {
    id: 1, title: "Hello World", category: "Basics",
    description: "Write a function that prints 'Hello World'. (Use the print statement)",
    initialCode: "def solve():\n    # your code here\n    pass",
    solution: "def solve():\n    print('Hello World')",
    testCases: [{ input: [], expected: { __stdout__: "Hello World" } }]
  },
  {
    id: 2, title: "Add Two Numbers", category: "Basics",
    description: "Write a function that takes two numbers and returns their sum.",
    initialCode: "def solve(a, b):\n    pass",
    solution: "def solve(a, b):\n    return a + b",
    testCases: [{ input: [2, 3], expected: 5 }, { input: [-1, 1], expected: 0 }]
  },
  {
    id: 3, title: "Modulo Operator", category: "Basics",
    description: "Return the remainder of a divided by b.",
    initialCode: "def solve(a, b):\n    pass",
    solution: "def solve(a, b):\n    return a % b",
    testCases: [{ input: [10, 3], expected: 1 }, { input: [14, 5], expected: 4 }]
  },
  {
    id: 4, title: "Exponentiation", category: "Basics",
    description: "Return base raised to the power of exp.",
    initialCode: "def solve(base, exp):\n    pass",
    solution: "def solve(base, exp):\n    return base ** exp",
    testCases: [{ input: [2, 3], expected: 8 }, { input: [5, 2], expected: 25 }]
  },
  {
    id: 5, title: "Area of Rectangle", category: "Basics",
    description: "Return the area of a rectangle given its width and height.",
    initialCode: "def solve(width, height):\n    pass",
    solution: "def solve(width, height):\n    return width * height",
    testCases: [{ input: [4, 5], expected: 20 }, { input: [10, 10], expected: 100 }]
  },

  // Conditionals (6-10)
  {
    id: 6, title: "Is Even", category: "Conditionals",
    description: "Return True if the number is even, False otherwise.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    return n % 2 == 0",
    testCases: [{ input: [4], expected: true }, { input: [7], expected: false }]
  },
  {
    id: 7, title: "Maximum of Two", category: "Conditionals",
    description: "Return the larger of two numbers using an if-else statement.",
    initialCode: "def solve(a, b):\n    pass",
    solution: "def solve(a, b):\n    if a > b:\n        return a\n    else:\n        return b",
    testCases: [{ input: [10, 20], expected: 20 }, { input: [5, -5], expected: 5 }]
  },
  {
    id: 8, title: "Sign of Number", category: "Conditionals",
    description: "Return 'Positive' if n > 0, 'Negative' if n < 0, and 'Zero' if n == 0.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    if n > 0:\n        return 'Positive'\n    elif n < 0:\n        return 'Negative'\n    else:\n        return 'Zero'",
    testCases: [{ input: [5], expected: "Positive" }, { input: [-2], expected: "Negative" }, { input: [0], expected: "Zero" }]
  },
  {
    id: 9, title: "Leap Year Check", category: "Conditionals",
    description: "Return True if the year is a leap year. A leap year is divisible by 4, but not by 100 unless it is also divisible by 400.",
    initialCode: "def solve(year):\n    pass",
    solution: "def solve(year):\n    if year % 400 == 0:\n        return True\n    if year % 100 == 0:\n        return False\n    return year % 4 == 0",
    testCases: [{ input: [2020], expected: true }, { input: [1900], expected: false }, { input: [2000], expected: true }]
  },
  {
    id: 10, title: "Vowel or Consonant", category: "Conditionals",
    description: "Given a single lowercase letter, return 'Vowel' if it is a, e, i, o, u, else 'Consonant'.",
    initialCode: "def solve(char):\n    pass",
    solution: "def solve(char):\n    if char in 'aeiou':\n        return 'Vowel'\n    return 'Consonant'",
    testCases: [{ input: ["a"], expected: "Vowel" }, { input: ["b"], expected: "Consonant" }]
  },

  // Strings (11-15)
  {
    id: 11, title: "String Length", category: "Strings",
    description: "Return the length of the given string.",
    initialCode: "def solve(s):\n    pass",
    solution: "def solve(s):\n    return len(s)",
    testCases: [{ input: ["hello"], expected: 5 }, { input: [""], expected: 0 }]
  },
  {
    id: 12, title: "Concatenate Strings", category: "Strings",
    description: "Return the concatenation of two strings.",
    initialCode: "def solve(s1, s2):\n    pass",
    solution: "def solve(s1, s2):\n    return s1 + s2",
    testCases: [{ input: ["a", "b"], expected: "ab" }, { input: ["hello ", "world"], expected: "hello world" }]
  },
  {
    id: 13, title: "To Uppercase", category: "Strings",
    description: "Convert the string to uppercase.",
    initialCode: "def solve(s):\n    pass",
    solution: "def solve(s):\n    return s.upper()",
    testCases: [{ input: ["hello"], expected: "HELLO" }, { input: ["A2Bridge"], expected: "A2BRIDGE" }]
  },
  {
    id: 14, title: "Reverse String", category: "Strings",
    description: "Return the reversed version of the string.",
    initialCode: "def solve(s):\n    pass",
    solution: "def solve(s):\n    return s[::-1]",
    testCases: [{ input: ["abc"], expected: "cba" }, { input: ["hello"], expected: "olleh" }]
  },
  {
    id: 15, title: "Count Vowels", category: "Strings",
    description: "Return the number of vowels (a, e, i, o, u) in a lowercase string.",
    initialCode: "def solve(s):\n    pass",
    solution: "def solve(s):\n    return sum(1 for char in s if char in 'aeiou')",
    testCases: [{ input: ["hello"], expected: 2 }, { input: ["rhythm"], expected: 0 }]
  },

  // Loops (16-20)
  {
    id: 16, title: "Sum of N", category: "Loops",
    description: "Return the sum of all integers from 1 to n (inclusive) using a loop.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total",
    testCases: [{ input: [5], expected: 15 }, { input: [10], expected: 55 }]
  },
  {
    id: 17, title: "Print 1 to N", category: "Loops",
    description: "Print numbers from 1 to n, each on a new line.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    for i in range(1, n + 1):\n        print(i)",
    testCases: [{ input: [3], expected: { __stdout__: "1\n2\n3" } }, { input: [1], expected: { __stdout__: "1" } }]
  },
  {
    id: 18, title: "Factorial", category: "Loops",
    description: "Return the factorial of n using a loop.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    res = 1\n    for i in range(1, n + 1):\n        res *= i\n    return res",
    testCases: [{ input: [5], expected: 120 }, { input: [0], expected: 1 }]
  },
  {
    id: 19, title: "Count Digits", category: "Loops",
    description: "Return the number of digits in a positive integer using a while loop.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    if n == 0: return 1\n    count = 0\n    while n > 0:\n        count += 1\n        n //= 10\n    return count",
    testCases: [{ input: [12345], expected: 5 }, { input: [9], expected: 1 }]
  },
  {
    id: 20, title: "Sum of Digits", category: "Loops",
    description: "Return the sum of the digits of a positive integer.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    total = 0\n    while n > 0:\n        total += n % 10\n        n //= 10\n    return total",
    testCases: [{ input: [123], expected: 6 }, { input: [902], expected: 11 }]
  },

  // Lists (21-25)
  {
    id: 21, title: "List Length", category: "Lists",
    description: "Return the number of elements in the list.",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return len(lst)",
    testCases: [{ input: [[1, 2, 3]], expected: 3 }, { input: [[]], expected: 0 }]
  },
  {
    id: 22, title: "Sum of List", category: "Lists",
    description: "Return the sum of all numbers in the list.",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return sum(lst)",
    testCases: [{ input: [[1, 2, 3, 4]], expected: 10 }, { input: [[-1, 1]], expected: 0 }]
  },
  {
    id: 23, title: "Find Maximum in List", category: "Lists",
    description: "Return the largest number in the list.",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return max(lst)",
    testCases: [{ input: [[1, 5, 2]], expected: 5 }, { input: [[-10, -5, -20]], expected: -5 }]
  },
  {
    id: 24, title: "Filter Even Numbers", category: "Lists",
    description: "Return a new list containing only the even numbers from the original list.",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return [x for x in lst if x % 2 == 0]",
    testCases: [{ input: [[1, 2, 3, 4, 5]], expected: [2, 4] }, { input: [[1, 3, 5]], expected: [] }]
  },
  {
    id: 25, title: "Reverse List", category: "Lists",
    description: "Return the reversed version of the list.",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return lst[::-1]",
    testCases: [{ input: [[1, 2, 3]], expected: [3, 2, 1] }, { input: [["a", "b"]], expected: ["b", "a"] }]
  },

  // Tuples & Sets (26-30)
  {
    id: 26, title: "Tuple Access", category: "Tuples & Sets",
    description: "Given a tuple, return its second element. Assume it has at least 2 elements.",
    initialCode: "def solve(tup):\n    pass",
    solution: "def solve(tup):\n    return tup[1]",
    testCases: [{ input: [[10, 20, 30]], expected: 20 }, { input: [["a", "b"]], expected: "b" }]
  },
  {
    id: 27, title: "Tuple to List", category: "Tuples & Sets",
    description: "Convert the given tuple into a list and return it.",
    initialCode: "def solve(tup):\n    pass",
    solution: "def solve(tup):\n    return list(tup)",
    testCases: [{ input: [[1, 2, 3]], expected: [1, 2, 3] }]
  },
  {
    id: 28, title: "Unique Elements", category: "Tuples & Sets",
    description: "Given a list, return a list of its unique elements (order doesn't matter, but sort it for the test).",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return sorted(list(set(lst)))",
    testCases: [{ input: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] }, { input: [[5, 5, 5]], expected: [5] }]
  },
  {
    id: 29, title: "Set Intersection", category: "Tuples & Sets",
    description: "Given two lists, return a sorted list of their common elements.",
    initialCode: "def solve(lst1, lst2):\n    pass",
    solution: "def solve(lst1, lst2):\n    return sorted(list(set(lst1) & set(lst2)))",
    testCases: [{ input: [[1, 2, 3], [2, 3, 4]], expected: [2, 3] }, { input: [[1, 2], [3, 4]], expected: [] }]
  },
  {
    id: 30, title: "Set Union", category: "Tuples & Sets",
    description: "Given two lists, return a sorted list of all unique elements from both.",
    initialCode: "def solve(lst1, lst2):\n    pass",
    solution: "def solve(lst1, lst2):\n    return sorted(list(set(lst1) | set(lst2)))",
    testCases: [{ input: [[1, 2], [2, 3]], expected: [1, 2, 3] }]
  },

  // Dictionaries (31-35)
  {
    id: 31, title: "Get Value", category: "Dictionaries",
    description: "Given a dictionary and a key, return the value. If the key doesn't exist, return -1.",
    initialCode: "def solve(d, key):\n    pass",
    solution: "def solve(d, key):\n    return d.get(key, -1)",
    testCases: [{ input: [{"a": 1, "b": 2}, "a"], expected: 1 }, { input: [{"a": 1}, "c"], expected: -1 }]
  },
  {
    id: 32, title: "Check Key", category: "Dictionaries",
    description: "Return True if the key exists in the dictionary, False otherwise.",
    initialCode: "def solve(d, key):\n    pass",
    solution: "def solve(d, key):\n    return key in d",
    testCases: [{ input: [{"x": 10}, "x"], expected: true }, { input: [{"x": 10}, "y"], expected: false }]
  },
  {
    id: 33, title: "Character Frequency", category: "Dictionaries",
    description: "Given a string, return a dictionary with the frequency of each character.",
    initialCode: "def solve(s):\n    pass",
    solution: "def solve(s):\n    freq = {}\n    for char in s:\n        freq[char] = freq.get(char, 0) + 1\n    return freq",
    testCases: [{ input: ["aba"], expected: {"a": 2, "b": 1} }, { input: ["hello"], expected: {"h": 1, "e": 1, "l": 2, "o": 1} }]
  },
  {
    id: 34, title: "Merge Dictionaries", category: "Dictionaries",
    description: "Given two dictionaries, merge them. If a key exists in both, use the value from the second dictionary.",
    initialCode: "def solve(d1, d2):\n    pass",
    solution: "def solve(d1, d2):\n    res = d1.copy()\n    res.update(d2)\n    return res",
    testCases: [{ input: [{"a": 1}, {"b": 2}], expected: {"a": 1, "b": 2} }, { input: [{"a": 1}, {"a": 2}], expected: {"a": 2} }]
  },
  {
    id: 35, title: "Dictionary Keys to List", category: "Dictionaries",
    description: "Return a sorted list of all keys in the dictionary.",
    initialCode: "def solve(d):\n    pass",
    solution: "def solve(d):\n    return sorted(list(d.keys()))",
    testCases: [{ input: [{"c": 1, "a": 2, "b": 3}], expected: ["a", "b", "c"] }]
  },

  // Functions (36-40)
  {
    id: 36, title: "Default Arguments", category: "Functions",
    description: "Write a function that takes a name and a greeting. If greeting is not provided, default it to 'Hello'. Return '{greeting}, {name}!'",
    initialCode: "def solve(name, greeting='Hello'):\n    pass",
    solution: "def solve(name, greeting='Hello'):\n    return f'{greeting}, {name}!'",
    testCases: [{ input: ["Alice"], expected: "Hello, Alice!" }, { input: ["Bob", "Hi"], expected: "Hi, Bob!" }]
  },
  {
    id: 37, title: "Sum of Multiple Arguments", category: "Functions",
    description: "Write a function that takes any number of arguments (*args) and returns their sum.",
    initialCode: "def solve(*args):\n    pass",
    solution: "def solve(*args):\n    return sum(args)",
    testCases: [{ input: [1, 2, 3], expected: 6 }, { input: [10, 20], expected: 30 }]
  },
  {
    id: 38, title: "Apply Lambda", category: "Functions",
    description: "Given a list of numbers, return a new list where each number is multiplied by 10. Use a lambda function and map().",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return list(map(lambda x: x * 10, lst))",
    testCases: [{ input: [[1, 2, 3]], expected: [10, 20, 30] }]
  },
  {
    id: 39, title: "Filter Function", category: "Functions",
    description: "Given a list of numbers, return a new list with only the numbers greater than 5. Use filter() and a lambda.",
    initialCode: "def solve(lst):\n    pass",
    solution: "def solve(lst):\n    return list(filter(lambda x: x > 5, lst))",
    testCases: [{ input: [[2, 6, 8, 4]], expected: [6, 8] }]
  },
  {
    id: 40, title: "Recursive Factorial", category: "Functions",
    description: "Return the factorial of n using recursion.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    if n <= 1: return 1\n    return n * solve(n - 1)",
    testCases: [{ input: [5], expected: 120 }, { input: [0], expected: 1 }]
  },

  // Algorithms (41-50)
  {
    id: 41, title: "FizzBuzz", category: "Algorithms",
    description: "Return a list of strings from 1 to n. For multiples of 3, use 'Fizz'. For multiples of 5, use 'Buzz'. For both, use 'FizzBuzz'. Otherwise, the number.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    res = []\n    for i in range(1, n + 1):\n        if i % 15 == 0: res.append('FizzBuzz')\n        elif i % 3 == 0: res.append('Fizz')\n        elif i % 5 == 0: res.append('Buzz')\n        else: res.append(str(i))\n    return res",
    testCases: [{ input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] }]
  },
  {
    id: 42, title: "Palindrome Check", category: "Algorithms",
    description: "Return True if the given string is a palindrome (reads the same forwards and backwards), False otherwise.",
    initialCode: "def solve(s):\n    pass",
    solution: "def solve(s):\n    return s == s[::-1]",
    testCases: [{ input: ["racecar"], expected: true }, { input: ["hello"], expected: false }]
  },
  {
    id: 43, title: "Anagram Check", category: "Algorithms",
    description: "Return True if two strings are anagrams of each other (contain the same characters in any order).",
    initialCode: "def solve(s1, s2):\n    pass",
    solution: "def solve(s1, s2):\n    return sorted(s1) == sorted(s2)",
    testCases: [{ input: ["listen", "silent"], expected: true }, { input: ["hello", "world"], expected: false }]
  },
  {
    id: 44, title: "Fibonacci Sequence", category: "Algorithms",
    description: "Return the nth Fibonacci number. F(0) = 0, F(1) = 1.",
    initialCode: "def solve(n):\n    pass",
    solution: "def solve(n):\n    if n <= 1: return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b",
    testCases: [{ input: [5], expected: 5 }, { input: [10], expected: 55 }]
  },
  {
    id: 45, title: "Find Missing Number", category: "Algorithms",
    description: "Given a list containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing.",
    initialCode: "def solve(nums):\n    pass",
    solution: "def solve(nums):\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)",
    testCases: [{ input: [[3, 0, 1]], expected: 2 }, { input: [[0, 1]], expected: 2 }]
  },
  {
    id: 46, title: "Two Sum", category: "Algorithms",
    description: "Given a list of numbers and a target, return the indices of the two numbers that add up to the target.",
    initialCode: "def solve(nums, target):\n    pass",
    solution: "def solve(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n    return []",
    testCases: [{ input: [[2, 7, 11, 15], 9], expected: [0, 1] }, { input: [[3, 2, 4], 6], expected: [1, 2] }]
  },
  {
    id: 47, title: "Valid Parentheses", category: "Algorithms",
    description: "Given a string of '(', ')', '{', '}', '[' and ']', return True if it is valid.",
    initialCode: "def solve(s):\n    pass",
    solution: "def solve(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack",
    testCases: [{ input: ["()[]{}"], expected: true }, { input: ["(]"], expected: false }]
  },
  {
    id: 48, title: "Merge Sorted Arrays", category: "Algorithms",
    description: "Given two sorted arrays, return a single merged sorted array.",
    initialCode: "def solve(arr1, arr2):\n    pass",
    solution: "def solve(arr1, arr2):\n    return sorted(arr1 + arr2)",
    testCases: [{ input: [[1, 3], [2, 4]], expected: [1, 2, 3, 4] }]
  },
  {
    id: 49, title: "Longest Word", category: "Algorithms",
    description: "Given a sentence, return the longest word.",
    initialCode: "def solve(sentence):\n    pass",
    solution: "def solve(sentence):\n    words = sentence.split()\n    return max(words, key=len) if words else ''",
    testCases: [{ input: ["The quick brown fox"], expected: "quick" }, { input: ["Hello world"], expected: "Hello" }]
  },
  {
    id: 50, title: "Binary Search", category: "Algorithms",
    description: "Given a sorted list and a target, return its index if found, else -1. Use binary search.",
    initialCode: "def solve(nums, target):\n    pass",
    solution: "def solve(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if nums[m] == target: return m\n        elif nums[m] < target: l = m + 1\n        else: r = m - 1\n    return -1",
    testCases: [{ input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 }, { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 }]
  },
  // Sorting (51-55)
  {
    id: 51, title: "Bubble Sort", category: "Algorithms",
    description: "Implement the Bubble Sort algorithm to sort an array of integers in ascending order.",
    initialCode: "def solve(nums):\n    pass",
    solution: "def solve(nums):\n    # Step 1: Get the length of the array\n    n = len(nums)\n    # Step 2: Loop through the array n times\n    for i in range(n):\n        # Step 3: Loop through the array from 0 to n-i-1\n        for j in range(0, n-i-1):\n            # Step 4: Swap if the element found is greater than the next element\n            if nums[j] > nums[j+1]:\n                nums[j], nums[j+1] = nums[j+1], nums[j]\n    # Step 5: Return the sorted array\n    return nums",
    testCases: [{ input: [[64, 34, 25, 12, 22, 11, 90]], expected: [11, 12, 22, 25, 34, 64, 90] }]
  },
  {
    id: 52, title: "Selection Sort", category: "Algorithms",
    description: "Implement the Selection Sort algorithm to sort an array of integers in ascending order.",
    initialCode: "def solve(nums):\n    pass",
    solution: "def solve(nums):\n    # Step 1: Loop through the array\n    for i in range(len(nums)):\n        # Step 2: Find the minimum element in remaining unsorted array\n        min_idx = i\n        for j in range(i+1, len(nums)):\n            if nums[min_idx] > nums[j]:\n                min_idx = j\n        # Step 3: Swap the found minimum element with the first element\n        nums[i], nums[min_idx] = nums[min_idx], nums[i]\n    # Step 4: Return the sorted array\n    return nums",
    testCases: [{ input: [[64, 25, 12, 22, 11]], expected: [11, 12, 22, 25, 64] }]
  },
  {
    id: 53, title: "Insertion Sort", category: "Algorithms",
    description: "Implement the Insertion Sort algorithm to sort an array of integers in ascending order.",
    initialCode: "def solve(nums):\n    pass",
    solution: "def solve(nums):\n    # Step 1: Traverse through 1 to len(nums)\n    for i in range(1, len(nums)):\n        key = nums[i]\n        # Step 2: Move elements of nums[0..i-1], that are greater than key, to one position ahead of their current position\n        j = i-1\n        while j >= 0 and key < nums[j]:\n            nums[j + 1] = nums[j]\n            j -= 1\n        nums[j + 1] = key\n    # Step 3: Return the sorted array\n    return nums",
    testCases: [{ input: [[12, 11, 13, 5, 6]], expected: [5, 6, 11, 12, 13] }]
  },
  {
    id: 54, title: "Sort by Parity", category: "Algorithms",
    description: "Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.",
    initialCode: "def solve(nums):\n    pass",
    solution: "def solve(nums):\n    # Step 1: Initialize two pointers, one at the start and one at the end\n    i, j = 0, len(nums) - 1\n    # Step 2: Loop until the two pointers meet\n    while i < j:\n        # Step 3: If the element at i is odd and the element at j is even, swap them\n        if nums[i] % 2 > nums[j] % 2:\n            nums[i], nums[j] = nums[j], nums[i]\n        # Step 4: If the element at i is even, move the i pointer forward\n        if nums[i] % 2 == 0: i += 1\n        # Step 5: If the element at j is odd, move the j pointer backward\n        if nums[j] % 2 == 1: j -= 1\n    # Step 6: Return the sorted array\n    return nums",
    testCases: [{ input: [[3, 1, 2, 4]], expected: [4, 2, 1, 3] }]
  },
  {
    id: 55, title: "Squares of a Sorted Array", category: "Algorithms",
    description: "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.",
    initialCode: "def solve(nums):\n    pass",
    solution: "def solve(nums):\n    # Step 1: Initialize two pointers, one at the start and one at the end\n    n = len(nums)\n    res = [0] * n\n    l, r = 0, n - 1\n    # Step 2: Loop backwards through the result array\n    for i in range(n - 1, -1, -1):\n        # Step 3: Compare the absolute values of the elements at the two pointers\n        if abs(nums[l]) > abs(nums[r]):\n            res[i] = nums[l] ** 2\n            l += 1\n        else:\n            res[i] = nums[r] ** 2\n            r -= 1\n    # Step 4: Return the sorted squares array\n    return res",
    testCases: [{ input: [[-4, -1, 0, 3, 10]], expected: [0, 1, 9, 16, 100] }]
  }
];
