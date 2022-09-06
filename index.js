var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var start = false;

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function(){
  if(!start){
    $("#level-title").text("Level" + level);
    start = true;
    nextSequence();
  }
})

function nextSequence(){

  userClickedPattern = [];

  level ++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  flashButton(randomChosenColour);
  playSound(randomChosenColour);
}

function flashButton(name){
  $('#' + name).css({opacity: 0});
  $('#' + name).animate({opacity: 1}, 100 );
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $('#' + currentColour).addClass("pressed");

  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(index){
  if (gamePattern[index] === userClickedPattern[index]) {

    // If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    //if the most recent answer is wrong

    //play game over sound
    playSound("wrong");

    //add game-over class to the body and remove it after the set time limit
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 to inform user the game is over
    $("#level-title").text("Game over, Press Any Key to Restart");

    //Restart the game
    restart();
  }
}

function restart(){
  //reset game values to restart game
  level = 0;
  gamePattern = [];
  start = false;
}
