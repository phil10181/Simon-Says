/*
1) developed the color pattern with randomizres
2) added the user imput for each one clicked. 
3) checked each button the user clicked and ensured that it is correct. 
4) Added the sounds and color fades. 
*/
let gamePattern = [];
let userChosenPattern = [];
let started = false;
let level =0;
const colorSelection = ["red", "blue", "green", "yellow"];
//start the game 
$(document).keypress(function(){
  if(started === false){
    $("#level-title").text("Level: "+ level);
    nextSequence();
    started = true;
  }
})
//change the sequence
// let a = "";
function nextSequence(){
  userChosenPattern = [];
  level++
      $("#level-title").text("Level: "+level);
   let a = colorSelection[Math.floor(Math.random()*colorSelection.length)];  
    gamePattern.push(a);
  console.log(gamePattern); //show wher

  for(let i = 0; i < gamePattern.length; i++){
    setTimeout(()=>{
      fadeColor(gamePattern[i]);
      playSound(gamePattern[i]);
    }, 500*(i+1));
  }
}
//retrieve user input with attr
$(".btn").click(function(){
  let b= $(this).attr("id");
  userChosenPattern.push(b);
  console.log(userChosenPattern)
  fadeColor(b);
  playSound(b);
  check(); //check each button they click
})
//check if the user clicks the right thing 
let c =0; 
function check(){
  if(userChosenPattern[c] === gamePattern[c]){
    c++;
    if(gamePattern.length === userChosenPattern.length){ //once it reaches level reset
      setTimeout(function(){
        nextSequence();
      }, 500)
      c=0;
    }
  } else {
    startOver();
  }

}
function startOver(){
  level=0; 
  gamePattern=[];
  userChosenPattern =[];
  started = false; 
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  }, 1000)
  $("#level-title").text("game over, press a key to restart")
}


/* these are the functions that fade colors and add sound */
function fadeColor(a){
  $("#"+a).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(b){
  var c = new Audio("sounds/" + b + ".mp3")
  c.play();
}
