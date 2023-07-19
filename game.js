var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAns(userClickedPattern.length-1);
    //console.log(userClickedPattern.length);
});

$(document).on("keydown", function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true
    }
});

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var colorId = "#"+randomChosenColor;
    $(colorId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //console.log($(colorId));
    playSound(randomChosenColor);

}

function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAns(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("Success!");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else
    {
        
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("Failure!")
        startOver();
    }
        
}

function startOver()
{
    gamePattern=[];
    userClickedPattern = [];
    started = false;
    level = 0;
}




