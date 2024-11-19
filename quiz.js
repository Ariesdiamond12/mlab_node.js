const readline = require("readline"); //I've imported the readline module,it is used for command-line applications where user input is needed
const util = require("util"); //I've imported the util module,it is used for utility functions like debugging and supporting asynchronous operations

// Created an interface for reading input
const rl = readline.createInterface({  //method is used to create an interface that allows you to interact with the user through input
  input: process.stdin,  //represents the standard input stream - user input
  output: process.stdout, //represents the standard output stream - output messages
});

// creating a Promise-based version of the rl.question method from the Node.js readline module,
const question = util.promisify(rl.question).bind(rl);

// Timer function that resolves after a specific time
const setTimer = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Function to ask a question with a time limit
async function askQuestionWithTimeLimit(questionText, timeLimit) {
  let answer;
  const timer = setTimer(timeLimit * 1000); // convert to milliseconds

  // Try to get the answer before the timer runs out
  try {
    const questionPromise = question(questionText);
    answer = await Promise.race([questionPromise, timer]);
  } catch (err) {
    // Handle any errors, like if timer expires
  }

  if (answer === undefined) {
    console.log("\nTime's up! Moving to the next question.");
  }
  return answer;
}

// Quiz questions
const questions = [
  { text: "What's the capital of France?", timeLimit: 10 },
  { text: "What is 2 + 2?", timeLimit: 10 },
  { text: "What is the capital of Japan?", timeLimit: 10 },
];

// Main quiz function
async function startQuiz() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const { text, timeLimit } = questions[i];

    console.log(`\nQuestion ${i + 1}:`);
    const answer = await askQuestionWithTimeLimit(text, timeLimit);

    if (answer) {
      console.log(`You answered: ${answer}`);
      // Add logic to check correctness here
      score += 1; // You can add conditions to increment score based on correctness
    }
  }

  console.log(`\nQuiz completed! Your score: ${score}/${questions.length}`);
  rl.close(); // Close the readline interface
}

// Start the quiz
startQuiz();
