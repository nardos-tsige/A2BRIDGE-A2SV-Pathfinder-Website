export const CODEFORCES_DETAILS: Record<string, { description: string; explanation: string; implementation: string }> = {
  "Watermelon": {
    description: "One hot summer day Pete and his friend Billy decided to buy a watermelon. They chose the biggest and the ripest one, in their opinion. After that the watermelon was weighed, and the scales showed w kilos. They rushed home, dying of thirst, and decided to divide the berry, however they faced a hard problem. Pete and Billy are great fans of even numbers, that's why they want to divide the watermelon in such a way that each of the two parts weighs even number of kilos, at the same time it is not obligatory that the parts are equal. The boys are extremely tired and want to start their meal as soon as possible, that's why you should help them and find out, if they can divide the watermelon in the way they want. For sure, each of them should get a part of positive weight.",
    explanation: "The problem asks if we can divide w into two even positive integers. An even number plus an even number is always an even number. Thus, w must be even. Also, the smallest even positive integer is 2, so the sum of two even positive integers is at least 4. Therefore, w must be an even number greater than or equal to 4.",
    implementation: "w = int(input())\nif w % 2 == 0 and w > 2:\n    print('YES')\nelse:\n    print('NO')"
  },
  "Way Too Long Words": {
    description: "Sometimes some words like \"localization\" or \"internationalization\" are so long that writing them many times in one text is quite tiresome. Let's consider a word too long, if its length is strictly more than 10 characters. All too long words should be replaced with a special abbreviation. This abbreviation is made like this: we write down the first and the last letter of a word and between them we write the number of letters between the first and the last letters. That number is in decimal system and doesn't contain any leading zeroes.",
    explanation: "For each word, check its length. If the length is greater than 10, print the first character, the length minus 2, and the last character. Otherwise, print the word as is.",
    implementation: "n = int(input())\nfor _ in range(n):\n    word = input()\n    if len(word) > 10:\n        print(word[0] + str(len(word) - 2) + word[-1])\n    else:\n        print(word)"
  },
  "Team": {
    description: "One day three best friends Petya, Vasya and Tonya decided to form a team and take part in programming contests. Participants are usually offered several problems during programming contests. Long before the start the friends decided that they will implement a problem if at least two of them are sure about the solution. Otherwise, the friends won't write the problem's solution.",
    explanation: "For each problem, count the number of friends who are sure about the solution. If the count is at least 2, increment the total number of problems they will implement.",
    implementation: "n = int(input())\ncount = 0\nfor _ in range(n):\n    a, b, c = map(int, input().split())\n    if a + b + c >= 2:\n        count += 1\nprint(count)"
  },
  "Next Round": {
    description: "Contestant who earns a score equal to or greater than the k-th place finisher's score will advance to the next round, as long as the contestant earns a positive score... an array of scores is given.",
    explanation: "Find the score of the k-th place finisher. Then count how many contestants have a score greater than or equal to this score and strictly greater than 0.",
    implementation: "n, k = map(int, input().split())\nscores = list(map(int, input().split()))\ncount = 0\nfor score in scores:\n    if score >= scores[k - 1] and score > 0:\n        count += 1\nprint(count)"
  },
  "Domino piling": {
    description: "You are given a rectangular board of M x N squares. Also you are given an unlimited number of standard domino pieces of 2 x 1 squares. You are allowed to rotate the pieces. You are asked to place as many dominoes as possible on the board so as to meet the following conditions: 1. Each domino completely covers two squares. 2. No two dominoes overlap. 3. Each domino lies entirely inside the board. It is allowed to touch the edges of the board.",
    explanation: "The area of the board is M * N. Each domino covers an area of 2. The maximum number of dominoes that can be placed is the integer division of the board's area by 2.",
    implementation: "m, n = map(int, input().split())\nprint((m * n) // 2)"
  },
  "Bit++": {
    description: "The classic programming language of Bitland is Bit++. This language is so peculiar and complicated. The language is that peculiar as it has exactly one variable, called x. Also, there are two operations: Operation ++ increases the value of variable x by 1. Operation -- decreases the value of variable x by 1. A statement in language Bit++ is a sequence, consisting of exactly one operation and one variable x. The statement is written without spaces, that is, it can only contain characters \"+\", \"-\", \"X\". Executing a statement means applying the operation it contains. A programme in Bit++ is a sequence of statements, each of them needs to be executed. Executing a programme means executing all the statements it contains. You're given a programme in language Bit++. The initial value of x is 0. Execute the programme and find its final value (the value of the variable when this programme is executed).",
    explanation: "Initialize x to 0. For each statement, if it contains '++', increment x. If it contains '--', decrement x. Print the final value of x.",
    implementation: "n = int(input())\nx = 0\nfor _ in range(n):\n    statement = input()\n    if '++' in statement:\n        x += 1\n    else:\n        x -= 1\nprint(x)"
  },
  "Petya and Strings": {
    description: "Little Petya loves presents. His mum bought him two strings of the same size for his birthday. The strings consist of uppercase and lowercase Latin letters. Now Petya wants to compare those two strings lexicographically. The letters' case does not matter, that is an uppercase letter is considered equivalent to the corresponding lowercase letter. Help Petya perform the comparison.",
    explanation: "Convert both strings to lowercase. Then compare them lexicographically. If the first string is less than the second, print -1. If the first string is greater than the second, print 1. If they are equal, print 0.",
    implementation: "s1 = input().lower()\ns2 = input().lower()\nif s1 < s2:\n    print(-1)\nelif s1 > s2:\n    print(1)\nelse:\n    print(0)"
  },
  "Helpful Maths": {
    description: "Xenia the beginner mathematician is a third year student at elementary school. She is now learning the addition operation. The teacher has written down the sum of multiple numbers. Pupils should calculate the sum. To make the calculation easier, the sum only contains numbers 1, 2 and 3. Still, that isn't enough for Xenia. She is only beginning to count, so she can calculate a sum only if the summands follow in non-decreasing order. For example, she can't calculate sum 1+3+2+1 but she can calculate sums 1+1+2 and 333. You've got the sum that was written on the board. Rearrange the summans and print the sum in such a way that Xenia can calculate the sum.",
    explanation: "Split the string by '+'. Sort the resulting list of numbers. Join the sorted list with '+' and print the result.",
    implementation: "s = input().split('+')\ns.sort()\nprint('+'.join(s))"
  },
  "Word Capitalization": {
    description: "Capitalization is writing a word with its first letter as a capital letter. Your task is to capitalize the given word. Note, that during capitalization all the letters except the first one remains unchanged.",
    explanation: "Capitalize the first letter of the word and concatenate it with the rest of the word.",
    implementation: "word = input()\nprint(word[0].upper() + word[1:])"
  },
  "Stones on the Table": {
    description: "There are n stones on the table in a row, each of them can be red, green or blue. Count the minimum number of stones to take from the table so that any two neighboring stones had different colors. Stones in a row are considered neighboring if there are no other stones between them.",
    explanation: "Iterate through the string of stones. If the current stone has the same color as the previous stone, increment the count of stones to remove.",
    implementation: "n = int(input())\nstones = input()\ncount = 0\nfor i in range(1, n):\n    if stones[i] == stones[i - 1]:\n        count += 1\nprint(count)"
  },
  "Boy or Girl": {
    description: "Those days, many boys use beautiful girls' photos as avatars in forums. So it is pretty hard to tell the gender of a user at the first glance. Last year, our hero went to a forum and had a nice chat with a beauty (he thought so). After that they talked very often and eventually they became a couple in the network. But yesterday, he came to see \"her\" in the real world and found out \"she\" is actually a very strong man! Our hero is very sad and he is too tired to love again now. So he came up with a way to recognize users' genders by their user names. This is his method: if the number of distinct characters in one's user name is odd, then he is a male, otherwise she is a female. You are given the string that denotes the user name, please help our hero to determine the gender of this user by his method.",
    explanation: "Count the number of distinct characters in the username. If the count is odd, print 'IGNORE HIM!'. Otherwise, print 'CHAT WITH HER!'.",
    implementation: "username = input()\nif len(set(username)) % 2 == 0:\n    print('CHAT WITH HER!')\nelse:\n    print('IGNORE HIM!')"
  },
  "Soldier and Bananas": {
    description: "A soldier wants to buy w bananas in the shop. He has to pay k dollars for the first banana, 2k dollars for the second one and so on (in other words, he has to pay i*k dollars for the i-th banana). He has n dollars. How many dollars does he have to borrow from his friend soldier to buy w bananas?",
    explanation: "Calculate the total cost of w bananas. The total cost is k * (1 + 2 + ... + w) = k * w * (w + 1) / 2. If the total cost is greater than n, he needs to borrow the difference. Otherwise, he doesn't need to borrow anything.",
    implementation: "k, n, w = map(int, input().split())\ntotal_cost = k * w * (w + 1) // 2\nprint(max(0, total_cost - n))"
  },
  "Bear and Big Brother": {
    description: "Bear Limak wants to become the largest of bears, or at least to become larger than his brother Bob. Right now, Limak and Bob weigh a and b respectively. It's guaranteed that Limak's weight is smaller than or equal to his brother's weight. Limak eats a lot and his weight is tripled after every year, while Bob's weight is doubled after every year. After how many full years will Limak become strictly larger (strictly heavier) than Bob?",
    explanation: "Initialize a counter for years to 0. While Limak's weight is less than or equal to Bob's weight, multiply Limak's weight by 3, multiply Bob's weight by 2, and increment the years counter. Print the years counter.",
    implementation: "a, b = map(int, input().split())\nyears = 0\nwhile a <= b:\n    a *= 3\n    b *= 2\n    years += 1\nprint(years)"
  },
  "Elephant": {
    description: "An elephant decided to visit his friend. It turned out that the elephant's house is located at point 0 and his friend's house is located at point x(x > 0) of the coordinate line. In one step the elephant can move 1, 2, 3, 4 or 5 positions forward. Determine, what is the minimum number of steps he need to make in order to get to his friend's house.",
    explanation: "The elephant should take as many steps of size 5 as possible. The minimum number of steps is the ceiling of x / 5, which can be calculated as (x + 4) // 5.",
    implementation: "x = int(input())\nprint((x + 4) // 5)"
  },
  "Word": {
    description: "Vasya is very upset that many people on the Net mix uppercase and lowercase letters in one word. That's why he decided to invent an extension for his favorite browser that would change the letters' register in every word so that it either only consisted of lowercase letters or, vice versa, only of uppercase ones. At that as little as possible letters should be changed in the word. For example, the word HoUse must be replaced with house, and the word ViP - with VIP. If a word contains an equal number of uppercase and lowercase letters, you should replace all the letters with lowercase ones. For example, maTRIx should be replaced by matrix. Your task is to use the given method on one given word.",
    explanation: "Count the number of uppercase and lowercase letters in the word. If the number of uppercase letters is strictly greater than the number of lowercase letters, convert the word to uppercase. Otherwise, convert it to lowercase.",
    implementation: "word = input()\nupper_count = sum(1 for c in word if c.isupper())\nlower_count = len(word) - upper_count\nif upper_count > lower_count:\n    print(word.upper())\nelse:\n    print(word.lower())"
  },
  "Wrong Subtraction": {
    description: "Little girl Tanya is learning how to decrease a number by one, but she does it wrong with a number consisting of two or more digits. Tanya subtracts one from a number by the following algorithm: if the last digit of the number is non-zero, she decreases the number by one; if the last digit of the number is zero, she divides the number by 10 (i.e. removes the last digit). You are given an integer number n. Tanya will subtract one from it k times. Your task is to print the result after all k subtractions. It is guaranteed that the result will be positive integer number.",
    explanation: "Simulate the process k times. If the last digit of n is non-zero, decrement n. If the last digit is zero, divide n by 10.",
    implementation: "n, k = map(int, input().split())\nfor _ in range(k):\n    if n % 10 != 0:\n        n -= 1\n    else:\n        n //= 10\nprint(n)"
  },
  "Tram": {
    description: "Linear Kingdom has exactly one tram line. It has n stops, numbered from 1 to n in the order of tram's movement. At the i-th stop a_i passengers exit the tram, while b_i passengers enter it. The tram is empty before it arrives at the first stop. Also, when the tram arrives at the last stop, all passengers exit so that it becomes empty. Your task is to calculate the tram's minimum capacity such that the number of people inside the tram at any time never exceeds this capacity. Note that at each stop all exiting passengers exit before any entering passenger enters the tram.",
    explanation: "Keep track of the current number of passengers in the tram and the maximum number of passengers seen so far. At each stop, subtract the number of exiting passengers and add the number of entering passengers to the current number of passengers. Update the maximum capacity if necessary.",
    implementation: "n = int(input())\ncurrent_passengers = 0\nmax_capacity = 0\nfor _ in range(n):\n    a, b = map(int, input().split())\n    current_passengers -= a\n    current_passengers += b\n    max_capacity = max(max_capacity, current_passengers)\nprint(max_capacity)"
  },
  "Queue at the School": {
    description: "During the break the schoolchildren, boys and girls, formed a queue of n people in the canteen. Initially the children stood in the order they entered the canteen. However, after a while the boys started feeling awkward for standing in front of the girls in the queue and they started letting the girls move forward each second. Let's describe the process more precisely. Let's say that the positions in the queue are sequentially numbered by integers from 1 to n, at that the person in the position number 1 is served first. Then, if at time x a boy stands on the i-th position and a girl stands on the (i+1)-th position, then at time x+1 the i-th position will have a girl and the (i+1)-th position will have a boy. The time is given in seconds. You've got the initial position of the children, at the initial moment of time. Determine the way the queue is going to look after t seconds.",
    explanation: "Simulate the process for t seconds. In each second, iterate through the queue from left to right. If a boy is at position i and a girl is at position i+1, swap them and increment i by 2 to avoid swapping the same boy again in the same second. Otherwise, increment i by 1.",
    implementation: "n, t = map(int, input().split())\nqueue = list(input())\nfor _ in range(t):\n    i = 0\n    while i < n - 1:\n        if queue[i] == 'B' and queue[i + 1] == 'G':\n            queue[i], queue[i + 1] = queue[i + 1], queue[i]\n            i += 2\n        else:\n            i += 1\nprint(''.join(queue))"
  },
  "Nearly Lucky Number": {
    description: "Petya loves lucky numbers. We all know that lucky numbers are the positive integers whose decimal representations contain only the lucky digits 4 and 7. For example, numbers 47, 744, 4 are lucky and 5, 17, 467 are not. Unfortunately, not all numbers are lucky. Petya calls a number nearly lucky if the number of lucky digits in it is a lucky number. He wonders whether number n is a nearly lucky number.",
    explanation: "Count the number of lucky digits (4 and 7) in the given number. If the count is a lucky number (i.e., consists only of 4s and 7s), print 'YES'. Otherwise, print 'NO'.",
    implementation: "n = input()\nlucky_count = n.count('4') + n.count('7')\nif lucky_count == 4 or lucky_count == 7:\n    print('YES')\nelse:\n    print('NO')"
  },
  "Anton and Danik": {
    description: "Anton likes to play chess, and so does his friend Danik. Once they have played n games in a row. For each game it's known who was the winner — Anton or Danik. None of the games ended with a tie. Now Anton wonders, who won more games, he or Danik? Help him determine this.",
    explanation: "Count the number of games won by Anton ('A') and Danik ('D'). Compare the counts and print 'Anton', 'Danik', or 'Friendship' accordingly.",
    implementation: "n = int(input())\ns = input()\nanton_wins = s.count('A')\ndanik_wins = s.count('D')\nif anton_wins > danik_wins:\n    print('Anton')\nelif danik_wins > anton_wins:\n    print('Danik')\nelse:\n    print('Friendship')"
  },
  "Translation": {
    description: "The translation from the Berland language into the Birland language is not an easy task. Those languages are very similar: a berlandish word differs from a birlandish word with the same meaning a little: it is spelled (and pronounced) reversely. For example, a Berlandish word code corresponds to a Birlandish word edoc. However, it's easy to make a mistake during the \"translation\". Vasya translated word s from Berlandish into Birlandish as t. Help him: find out if he translated the word correctly.",
    explanation: "Check if the second string is the reverse of the first string. If it is, print 'YES'. Otherwise, print 'NO'.",
    implementation: "s = input()\nt = input()\nif s == t[::-1]:\n    print('YES')\nelse:\n    print('NO')"
  },
  "Vanya and Fence": {
    description: "Vanya and his friends are walking along the fence of height h and they do not want the guard to notice them. In order to achieve this the height of each of the friends should not exceed h. If the height of some person is greater than h he can bend down and then he surely won't be noticed by the guard. The height of the i-th person is equal to a_i. Consider the width of the person walking as usual to be equal to 1, while the width of the bent person is equal to 2. Friends want to talk to each other while walking, so they would like to walk in a single row. What is the minimum width of the road, such that friends can walk in a row and remain unnoticed by the guard?",
    explanation: "Iterate through the heights of the friends. For each friend, if their height is greater than h, add 2 to the total width. Otherwise, add 1.",
    implementation: "n, h = map(int, input().split())\nheights = list(map(int, input().split()))\nwidth = 0\nfor height in heights:\n    if height > h:\n        width += 2\n    else:\n        width += 1\nprint(width)"
  },
  "Beautiful Year": {
    description: "It seems like the year of 2013 came only yesterday. Do you know a curious fact? The year of 2013 is the first year after the old 1987 with only distinct digits. Now you are suggested to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.",
    explanation: "Increment the given year by 1. Check if all digits in the year are distinct. If they are, print the year. Otherwise, repeat the process.",
    implementation: "year = int(input())\nwhile True:\n    year += 1\n    if len(set(str(year))) == 4:\n        print(year)\n        break"
  },
  "Presents": {
    description: "Little Petya very much likes gifts. Recently he has received a new laptop as a New Year gift from his mother. He immediately decided to give it to somebody else as what can be more pleasant than giving somebody a gift. And on this occasion he organized a New Year party at his place and invited n his friends. There's one thing he didn't take into account: the friends took the gift-giving idea too literally and decided to make a gift to one another. Each friend gave a gift to exactly one friend. Petya knows who gave a gift to whom. He wants to know for each friend who gave him a gift.",
    explanation: "Create an array of size n to store the giver for each receiver. Iterate through the given array, where the i-th element is the receiver of the gift from the i-th friend. Set the receiver's giver to i. Print the resulting array.",
    implementation: "n = int(input())\npresents = list(map(int, input().split()))\nreceivers = [0] * n\nfor i in range(n):\n    receivers[presents[i] - 1] = i + 1\nprint(*receivers)"
  },
  "Magnets": {
    description: "Mad scientist Mike entertains himself by arranging rows of dominoes. He doesn't need dominoes, though: he uses rectangular magnets instead. Each magnet has two poles, positive (a plus) and negative (a minus). If two magnets are put together at a close distance, then the like poles will repel each other and the opposite poles will attract each other. Mike starts by laying one magnet horizontally on the table. During each following step Mike adds one more magnet horizontally to the right end of the row. Depending on how Mike puts the magnet on the table, it is either attracted to the previous one (forming a group of multiple magnets linked together) or repelled by it (then Mike lays this magnet at some distance to the right from the previous one). We assume that a sole magnet not linked to others forms a group of its own. Mike arranged multiple magnets in a row. Determine the number of groups that the magnets formed.",
    explanation: "Iterate through the magnets. If the current magnet is different from the previous magnet, increment the group count.",
    implementation: "n = int(input())\ngroups = 1\nprev_magnet = input()\nfor _ in range(n - 1):\n    curr_magnet = input()\n    if curr_magnet != prev_magnet:\n        groups += 1\n    prev_magnet = curr_magnet\nprint(groups)"
  },
  "In Search of an Easy Problem": {
    description: "When preparing a tournament, Codeforces coordinators try treir best to make the first problem as easy as possible. This time the coordinator had chosen some problem and asked n people about their opinions. Each person answered whether this problem is easy or hard. If at least one of these n people has answered that the problem is hard, the coordinator decides to change the problem. For the given responses, check if the problem is easy enough.",
    explanation: "Check if the number 1 (indicating hard) is in the list of responses. If it is, print 'HARD'. Otherwise, print 'EASY'.",
    implementation: "n = int(input())\nresponses = list(map(int, input().split()))\nif 1 in responses:\n    print('HARD')\nelse:\n    print('EASY')"
  },
  "George and Accommodation": {
    description: "George has recently entered the BSUCP (Berland State University for Cool Programmers). George has a friend Alex who has also entered the university. Now they are moving into a dormitory. George and Alex want to live in the same room. The dormitory has n rooms. At the moment the i-th room has p_i people living in it and the room can accommodate q_i people in total (p_i <= q_i). Your task is to count how many rooms has free place for both George and Alex.",
    explanation: "Iterate through the rooms. For each room, check if the difference between the capacity and the current number of people is at least 2. If it is, increment the count of available rooms.",
    implementation: "n = int(input())\ncount = 0\nfor _ in range(n):\n    p, q = map(int, input().split())\n    if q - p >= 2:\n        count += 1\nprint(count)"
  },
  "Calculating Function": {
    description: "For a positive integer n let's define a function f: f(n) = -1 + 2 - 3 + .. + (-1)^n * n. Your task is to calculate f(n) for a given integer n.",
    explanation: "If n is even, the sum is n / 2. If n is odd, the sum is -(n + 1) / 2.",
    implementation: "n = int(input())\nif n % 2 == 0:\n    print(n // 2)\nelse:\n    print(-(n + 1) // 2)"
  },
  "Drinks": {
    description: "Little Vasya loves orange juice very much. That's why any food and drink in his kitchen necessarily contains orange juice. There are n drinks in his fridge, the volume fraction of orange juice in the i-th drink equals p_i percent. One day Vasya decided to make himself an orange-containing drink. He took equal proportions of each of the n drinks and mixed them. Then he wondered, how much orange juice the cocktail has. Find the volume fraction of orange juice in the final drink.",
    explanation: "Calculate the sum of the volume fractions of orange juice in all drinks and divide it by the total number of drinks.",
    implementation: "n = int(input())\nfractions = list(map(int, input().split()))\nprint(sum(fractions) / n)"
  },
  "Ultra-Fast Mathematician": {
    description: "Shapur was an extremely gifted student. He was great at everything including Mathematics. He was so brilliant that he could answer any math problem in seconds. One day his teacher gave him a very hard problem. He was given two numbers and he had to find the third number. The third number is calculated by comparing corresponding digits of the given two numbers. If the digits are different, the corresponding digit of the third number is 1, otherwise it is 0. Help Shapur calculate the third number.",
    explanation: "Iterate through the digits of the two numbers simultaneously. If the digits are different, append '1' to the result string. Otherwise, append '0'.",
    implementation: "s1 = input()\ns2 = input()\nres = ''\nfor i in range(len(s1)):\n    if s1[i] != s2[i]:\n        res += '1'\n    else:\n        res += '0'\nprint(res)"
  },
  "Is your horseshoe on the other hoof?": {
    description: "Valera the Horse is going to the party with friends. He has been following the fashion trends for a while, and he knows that it is very popular to wear all horseshoes of different color. Valera has got four horseshoes left from the last year, but maybe some of them have the same color. In this case he needs to go to the store and buy some few more horseshoes, not to lose face in front of his stylish comrades. Fortunately, the store sells horseshoes of all colors under the sun and Valera has enough money to buy any four of them. However, in order to save the money, he would like to spend as little money as possible, so you need to help Valera and determine what is the minimum number of horseshoes he needs to buy to wear four horseshoes of different colors to a party.",
    explanation: "Count the number of unique colors among the four horseshoes. The minimum number of horseshoes to buy is 4 minus the number of unique colors.",
    implementation: "colors = list(map(int, input().split()))\nprint(4 - len(set(colors)))"
  },
  "Divisibility Problem": {
    description: "You are given two positive integers a and b. In one move you can increase a by 1 (replace a with a+1). Your task is to find the minimum number of moves you need to do in order to make a divisible by b. It is possible, that you have to make 0 moves, as a is already divisible by b. You have to answer t independent test cases.",
    explanation: "For each test case, if a is divisible by b, the answer is 0. Otherwise, the answer is b - (a % b).",
    implementation: "t = int(input())\nfor _ in range(t):\n    a, b = map(int, input().split())\n    if a % b == 0:\n        print(0)\n    else:\n        print(b - (a % b))"
  },
  "Gravity Flip": {
    description: "Little Chris is bored during his physics lessons (too easy), so he has built a toy box to keep himself occupied. The box is special, since it has the ability to change gravity. There are n columns of toy cubes in the box arranged in a line. The i-th column contains a_i cubes. At first, the gravity in the box is pulling the cubes downwards. When Chris switches the gravity, it begins to pull all the cubes to the right side of the box.",
    explanation: "When gravity pulls the cubes to the right, the cubes will fall such that the columns on the right will have more or equal cubes compared to the columns on the left. This is exactly equivalent to sorting the array of column heights in non-decreasing order.",
    implementation: "n = int(input())\n# Step 1: Read the array of column heights\na = list(map(int, input().split()))\n# Step 2: Sort the array in ascending order\na.sort()\n# Step 3: Print the sorted array\nprint(*a)"
  },
  "Puzzles": {
    description: "The end of the school year is near and Ms. Jones wants to give her students some puzzles. She has m puzzles in the shop, and she wants to buy n puzzles for her students. The i-th puzzle consists of f_i pieces. She wants to choose n puzzles such that the difference between the maximum and minimum number of pieces in the chosen puzzles is minimized.",
    explanation: "First, sort the array of puzzle sizes. Then, iterate through the array and find the minimum difference between the i-th element and the (i+n-1)-th element.",
    implementation: "n, m = map(int, input().split())\n# Step 1: Read the array of puzzle sizes\nf = list(map(int, input().split()))\n# Step 2: Sort the array in ascending order\nf.sort()\n# Step 3: Initialize the minimum difference to infinity\nmin_diff = float('inf')\n# Step 4: Iterate through the array to find the minimum difference of any subarray of length n\nfor i in range(m - n + 1):\n    min_diff = min(min_diff, f[i + n - 1] - f[i])\n# Step 5: Print the minimum difference\nprint(min_diff)"
  },
  "Twins": {
    description: "Imagine that you have a twin brother or sister. Having another person that looks exactly like you seems very unusual. It's hard to say if having something of your own is possible. You and your twin have a set of n coins. You want to take some coins such that the sum of their values is strictly greater than the sum of the values of the remaining coins. You want to take the minimum possible number of coins.",
    explanation: "Sort the coins in descending order. Keep taking the largest coin until the sum of the coins you have taken is strictly greater than the sum of the remaining coins.",
    implementation: "n = int(input())\n# Step 1: Read the array of coin values\ncoins = list(map(int, input().split()))\n# Step 2: Sort the array in descending order\ncoins.sort(reverse=True)\n# Step 3: Calculate the total sum of all coins\ntotal_sum = sum(coins)\n# Step 4: Keep taking coins until your sum is strictly greater than the remaining sum\nmy_sum = 0\ncount = 0\nfor coin in coins:\n    my_sum += coin\n    count += 1\n    if my_sum > total_sum - my_sum:\n        break\n# Step 5: Print the number of coins taken\nprint(count)"
  },
  "Dragons": {
    description: "Kirito is stuck on a level of the MMORPG he is playing now. To move on in the game, he's got to defeat all n dragons that live on this level. Kirito and the dragons have strength, which is represented by an integer. In the duel between two opponents the duel's outcome is determined by their strength. Initially, Kirito's strength equals s. If Kirito starts duelling with the i-th (1 <= i <= n) dragon and Kirito's strength is not greater than the dragon's strength x_i, then Kirito loses the duel and dies. But if Kirito's strength is greater than the dragon's strength, then he defeats the dragon and gets a bonus strength increase by y_i. Kirito can fight the dragons in any order. Determine whether he can move on to the next level of the game, that is, defeat all dragons without a single loss.",
    explanation: "To maximize the chances of defeating all dragons, Kirito should fight the weakest dragons first. Sort the dragons by their strength in ascending order. Then, simulate the fights. If Kirito can defeat a dragon, his strength increases. If he can't, he loses.",
    implementation: "s, n = map(int, input().split())\n# Step 1: Read the dragons' strengths and bonuses\ndragons = []\nfor _ in range(n):\n    x, y = map(int, input().split())\n    dragons.append((x, y))\n# Step 2: Sort the dragons by their strength in ascending order\ndragons.sort()\n# Step 3: Simulate the fights\nfor x, y in dragons:\n    if s > x:\n        s += y\n    else:\n        print('NO')\n        exit()\n# Step 4: If all dragons are defeated, print YES\nprint('YES')"
  },
  "Sort the Array": {
    description: "Being a programmer, you like arrays a lot. For your birthday, your friends have given you an array a consisting of n distinct integers. Unfortunately, the size of a is too small. You want a bigger array! Your friends agree to give you a bigger array, but only if you are able to answer the following question correctly: is it possible to sort the array a (in increasing order) by reversing exactly one segment of a? See definitions of segment and reversing in the notes.",
    explanation: "First, find the first index where the array is not sorted. Then, find the last index where the array is not sorted. Reverse the subarray between these two indices. Finally, check if the whole array is sorted. If it is, print 'yes' and the 1-based indices. Otherwise, print 'no'.",
    implementation: "n = int(input())\n# Step 1: Read the array\na = list(map(int, input().split()))\n# Step 2: Find the first index where the array is not sorted\nl = 0\nwhile l < n - 1 and a[l] < a[l + 1]:\n    l += 1\n# Step 3: Find the last index where the array is not sorted\nr = n - 1\nwhile r > 0 and a[r] > a[r - 1]:\n    r -= 1\n# Step 4: If the array is already sorted, print yes and 1 1\nif l >= r:\n    print('yes')\n    print('1 1')\nelse:\n    # Step 5: Reverse the subarray between l and r\n    a[l:r + 1] = reversed(a[l:r + 1])\n    # Step 6: Check if the whole array is sorted\n    is_sorted = True\n    for i in range(n - 1):\n        if a[i] > a[i + 1]:\n            is_sorted = False\n            break\n    # Step 7: Print the result\n    if is_sorted:\n        print('yes')\n        print(f'{l + 1} {r + 1}')\n    else:\n        print('no')"
  }
};
