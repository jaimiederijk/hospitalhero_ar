var danceHtmlElements = {
  points : document.querySelector('#dancepoints'),
  danceButtons : document.querySelectorAll('.dancebuttons'),
  danceInstructor : document.querySelectorAll("#danceinstructor em"),
  pause : document.querySelector('#dancepause'),
}
var danceState = {
  points: 0,
  startStop: false,
  danceMoves: ["A","B","C","D"],
  danceInstructions:["A","D","D","B","B","D","D","B","B"],
  currentDanceMove: "B",

}
var setup = () => {
  for (var i = 0; i < danceHtmlElements.danceButtons.length; i++) {
    danceHtmlElements.danceButtons[i].addEventListener("click",(e)=>{
      if (e.currentTarget.innerHTML == danceState.currentDanceMove) {
        danceState.points = danceState.points + 1;
        updatePoints();
      }
    })
  }
  startGame();
}

var startGame = () => {
  var danceInterval = setInterval( (e)=>{
    var nr = Math.floor(Math.random() * 4);
    var newDanceMove = danceState.danceMoves[nr];

    danceState.danceInstructions.unshift(newDanceMove);
    if (danceState.danceInstructions.length>9) {
      danceState.danceInstructions.pop();
    }

      danceHtmlElements.danceInstructor[0].innerHTML = danceState.danceInstructions[0];
      danceHtmlElements.danceInstructor[1].innerHTML = danceState.danceInstructions[1];
      danceHtmlElements.danceInstructor[2].innerHTML = danceState.danceInstructions[2];
      danceHtmlElements.danceInstructor[3].innerHTML = danceState.danceInstructions[3];
      danceHtmlElements.danceInstructor[4].innerHTML = danceState.danceInstructions[4];
      danceHtmlElements.danceInstructor[5].innerHTML = danceState.danceInstructions[5];
      danceHtmlElements.danceInstructor[6].innerHTML = danceState.danceInstructions[6];
      danceHtmlElements.danceInstructor[7].innerHTML = danceState.danceInstructions[7];
      danceHtmlElements.danceInstructor[8].innerHTML = danceState.danceInstructions[8];
    // danceHtmlElements.danceInstructor.innerHTML = danceState.danceInstructions;

    danceState.currentDanceMove = danceState.danceInstructions[4];
  },2000);
  danceHtmlElements.pause.addEventListener("click",(e)=>{
    if (e.currentTarget.classList.contains("paused")) {
      danceInterval = setInterval( (e)=>{
        var nr = Math.floor(Math.random() * 6);
        danceHtmlElements.danceInstructor.innerHTML = danceState.danceMoves[nr];
        danceState.currentDanceMove = danceState.danceMoves[nr];
      },1000);
      e.currentTarget.classList.remove("paused");
    } else {
      clearInterval(danceInterval);
      e.currentTarget.classList.add("paused");
    }
  })
}
var updatePoints = () => {
  if (danceHtmlElements.points) {
    danceHtmlElements.points.innerHTML = danceState.points;
  }
}

setup();
