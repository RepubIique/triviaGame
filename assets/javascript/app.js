//~~~~~~~~~~~~~~~~~~~~~~ Game logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function getQuestions(number, question, answers, rightAnswer) {
  let questions = {};
  questions.number = number;
  questions.question = question;
  questions.answers = answers;
  questions.rightAnswer = rightAnswer;

  return questions;
}

let questionList = [
  getQuestions(
    1,
    "Name the seventh planet from the sun.",
    ["Earth", "Mercury", "Pluto", "Uranus"],
    4
  ),
  getQuestions(
    2,
    "If a woodchuck could chuck wood?",
    [35, 42, "As much wood the would can chuck", 2],
    1
  ),
  getQuestions(
    3,
    "Name the largest ocean of the world",
    ["Atlantic Ocean", "Pacific Ocean", "Specific Ocean", "Artic Ocean"],
    2
  )
];

function IsRightAnswer(question, guess) {
  if (question.rightAnswer === guess) {
    return true;
  } else {
    return false;
  }
}

let currentQuestion = questionList[1];

console.log(IsRightAnswer(currentQuestion, 4));

//~~~~~~~~~~~~~~~~~~~~~~ Timer logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

var number = 60;
var intervalId;

function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  number--;
  $("#show-number").html("<h2>" + number + "</h2>");
  if (number === 0) {
    stop();
  }
}

function stop() {
  clearInterval(intervalId);
}
