//Global variables

let questionsAnswered = 0;
let correctAnswer = [];
let incorrectAnswers = [];
let answersshuffle = [];
let correctScore = 0;
let incorrectScore = 0;
let secondsLeft = 0;
var downloadTimer = null;

displayQuestions();
//~~~~~~~~~~~~~~~~~~~~~~ GameContainer logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function displayQuestions() {
  if (questionsAnswered == 10) {
    showResults();
  } else {
    $("#answers").html("");

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
        options = shuffle([correctAnswer, ...incorrectAnswers]);
        $("#question").html("<h2>" + response.results[i].question + "</h2>");

        $("#answers").append(`
      <form name="multipleC">
      <input type="radio" value="${options[0]}" name="answer">
      <label>${options[0]}</label><br>
      <input type="radio" value="${options[1]}" name="answer">
      <label>${options[1]}</label><br>
      <input type="radio" value="${options[2]}" name="answer">
      <label>${options[2]}</label><br>
      <input type="radio" value="${options[3]}" name="answer"> 
      <label>${options[3]}</label><br>
     `);
      }
      timerCountdown(20);
    });
  }
}

// Fisher-Algorithm for shuffling
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle…
  while (0 !== currentIndex) {
    // Pick a remaining element…
    randomIndex = Math.floor(Math.random() * currentIndex--);

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//~~~~~~~~~~~~~~~~~~~~~~ Timer Countdown ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function timerCountdown(durationInSeconds) {
  let timeLeft = durationInSeconds;
  downloadTimer = setInterval(function() {
    $("#timer").html(`<h3>Time left:${timeLeft}</h3>`);
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(downloadTimer);
      showResults();
      $("#timer").html(`<h3>Time has ran out</h3 >`);
    }
  }, 1000);
}

//~~~~~~~~~~~ Check Answer logic ~~~~~~~~~~~~~~~//

function answerChecker(ans) {
  questionsAnswered++;
  let radios = multipleC.elements[ans];
  window.rdValue;
  for (var i = 0; i < radios.length; i++) {
    var someRadio = radios[i];
    if (someRadio.checked) {
      rdValue = someRadio.value;
      break;
    } else rdValue = "noRadioChecked";
  }

  if (correctAnswer === rdValue) {
    answerIsCorrect();
  } else {
    answerIsIncorrect();
  }
}

function answerIsCorrect() {
  correctScore++;
  displayQuestions();
  clearInterval(downloadTimer);
}

function answerIsIncorrect() {
  incorrectScore++;
  displayQuestions();
  clearInterval(downloadTimer);
}

function showResults() {
  $("#rsButton").attr("style", "");
  $("#question").html("");
  $("#answers").html("");
  $("#timer").html("");
  $("#submitButton").hide();
  $("#score-counter").html(`<h3>Score:${correctScore}</h3>`);
  $("#score-decounter").html(`<h3>Wrong:${incorrectScore}</h3>`);
}

function startNewGame() {
  location.reload();
}
