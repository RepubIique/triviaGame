//Global variables

let correctAnswer = [];
let incorrectAnswers = [];
let answers = [];
let correctScore = 0;
let incorrectScore = 0;
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
      answers = [correctAnswer, ...incorrectAnswers];
      $("#question").html("<h2>" + response.results[i].question + "</h2>");

      $("#answers").append(
        '<form name="multipleC">' +
          '<input type="radio" value="r1" name="answer">' +
          "<label>" +
          answers[0] +
          "</label><br>" +
          '<input type="radio" value="r2" name="answer">' +
          "<label>" +
          answers[1] +
          "</label><br>" +
          '<input type="radio" value="r3" name="answer">' +
          "<label>" +
          answers[2] +
          "</label><br>" +
          '<input type="radio" value="r4" name="answer">' +
          "<label>" +
          answers[3] +
          "</label><br>" +
          "</form>"
      );
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
      $("#timer").html("<h3>" + "Time left: " + number + "</h3>");
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

//~~~~~~~~~~~~~~~~~~~~~~ Reset logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function reset() {
  $("#question").html("");
  $("#answers").html("");
  $("#timer").html("");
  displayQuestions();
}

//~~~~~~~~~~~ Check Answer logic ~~~~~~~~~~~~~~~//

function answerChecker(ans) {
  var radios = multipleC.elements[ans];
  window.rdValue;
  for (var i = 0; i < radios.length; i++) {
    var someRadio = radios[i];
    if (someRadio.checked) {
      rdValue = someRadio.value;
      break;
    } else rdValue = "noRadioChecked";
  }
  if (rdValue == "r1") {
    answerIsCorrect();
    reset();
  } else if ((rdValue == "r2", "r3", "r4")) {
    answerIsIncorrect();
    reset();
  } else {
    // not working
    console.log("no radio checked");
  }
}

//~~~~~~~~~~~~~~~~~~~~~~ End game after 3 rounds logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// to do

//~~~~~~~~~~~~~~~~~~~~~~ Win/Lose logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function answerIsCorrect() {
  correctScore++;
  $("#score-counter").html("<h3>" + "Score: " + correctScore + "</h3>");
}

function answerIsIncorrect() {
  incorrectScore++;
  $("#score-decounter").html("<h3>" + "Wrong: " + incorrectScore + "</h3>");
}
