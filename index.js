var buttonColours = ["red", "blue", "green", "yellow"];  //สีทั้งหมด
var gamePattern = []; 
var userClickedPattern = [];
var level = 0
var started = false;

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function flashButton(colour){
    $("#"+colour).fadeOut(100).fadeIn(100);
};
function nextSequence(){    //Function สุ่มตัวเลช 0-3
    userClickedPattern = []; //เมื่อเริ้ม sequence ใหม่จะรีเซ็ต userclickedPattern
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];      //เลือกสีจากการสุ่มด้วยตัวเลข
    gamePattern.push(randomChosenColour);   //เพิ่มสีที่สุ่มได้เข้า gamePattern
    flashButton(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level)
    
};



$("div.btn").click(function() {
    var userChosenColour = $(this).attr("id");  //เมื่อคลิ้กแล้วจะเลือกสีไอดีของ div ที่ถูกคลิ้ก
    userClickedPattern.push(userChosenColour);  //นำข้อมูลสีไปใส่ใน arrays userClickedPattern
    var audio = new Audio("sounds/"+userChosenColour+".mp3");  //สร้างเสียงของสีที่ถูกสุ่ม
    audio.play();    
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    

  });


  function checkAnswer(checking){
    if(userClickedPattern[checking] === gamePattern[checking]){
        if(userClickedPattern.length === gamePattern.length ){
        setTimeout(function(){
            nextSequence();
        }, 1000);}
    } else {
        $("body").addClass("game-over");
        $("h1").text("Game Over!!!!");
        var audioWrong = new Audio("sounds/wrong.mp3");
            audioWrong.play();
        setTimeout(function(){           
            $("body").removeClass("game-over")
            startedOver();
        }, 5000);             
    }
  };

  function animatePress(chosen){
    $("#"+chosen).addClass("pressed");
    setTimeout(function(){
    $("#"+chosen).removeClass("pressed");
    }, 100);
  };



 
 $(document).keydown(function(event){
    if(!started){
        setTimeout(function(){
        nextSequence();
        started = true;
        }, 700);
    
}
 });

 function startedOver(){
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    started = false;
    $("h1").text("Press any key to Start");
  };


 