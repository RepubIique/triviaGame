//forced global variables

let correctAnswer = [];
let incorrectAnswers = [];

//~~~~~~~~~~~~~~~~~~~~~~ GameContainer logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function displayQuestions() {
  const queryURL =
    "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";

  //~~~~~~~~~~~~~~~~~~~~~~ Trivia Game API logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (let i = 0; i < response.results.length; i++) {
      correctAnswer = response.results[i].correct_answer;
      incorrectAnswers = response.results[i].incorrect_answers;
      let answers = [correctAnswer, ...incorrectAnswers];
      $("#question").html("<h2>" + response.results[i].question + "</h2>");

      $("#answers").append(
        '<input type="radio" name="answer">' +
          "<label>" +
          answers[0] +
          "</label><br>" +
          '<input type="radio" name="answer">' +
          "<label>" +
          answers[1] +
          "</label><br>" +
          '<input type="radio" name="answer">' +
          "<label>" +
          answers[2] +
          "</label><br>" +
          '<input type="radio" name="answer">' +
          "<label>" +
          answers[3] +
          "</label><br>"
      );
    }

    //~~~~~~~~~~~~~~~~~~~~~~ Reset logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    function reset() {
      $("#question").html("");
      $("#answers").html("");
      displayQuestions();
    }
    //~~~~~~~~~~~~~~~~~~~~~~ Timer logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    var number = 41;
    var intervalId;

    function run() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
      number--;
      $("#show-number").html("<h3>" + "Time left: " + number + "</h3>");
      if (number === 0) {
        stop();
        reset();
      }
    }

    function stop() {
      clearInterval(intervalId);
    }

    run();
  });
}

displayQuestions();

//~~~~~~~~~~~ Submit Correct/Incorrect Answer logic ~~~~~~~~~~~~~~~//

function answerChecker() {
  if ((correctAnswer = true)) {
    console.log("right");
  } else {
    console.log("nope");
  }
}

//~~~~~~~~~~~~~~~~~~~~~~ End game after 3 rounds logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// to do
