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
  danceInstructions:["A","D","D","B","B","D","D","B","B","D","A"],
  currentDanceMove: "B"

}
var setup = () => {
  for (var i = 0; i < danceHtmlElements.danceButtons.length; i++) {
    danceHtmlElements.danceButtons[i].addEventListener("click",(e)=>{
      //debugger
    //  console.log(danceState.currentDanceMove + "  " + danceState.danceInstructions);
      if (e.currentTarget.innerHTML == danceState.currentDanceMove) {
        var currentDanceMove = document.querySelector(".currentdancemove");
        if (!currentDanceMove.classList.contains("gothim")) {
          currentDanceMove.classList.add("gothim");
          danceState.points = danceState.points + 1;
          updatePoints();
        } else {// wrong button

        }
      }
    })
  }
   startGame();
}

var startGame = () => {
  var danceInterval = setInterval( (e)=>{
    //select next move
    var nr = Math.floor(Math.random() * 4);
    var newDanceMove = danceState.danceMoves[nr];
    //add newmove
    danceState.danceInstructions.push(newDanceMove);
    // if longer remove oldest
    if (danceState.danceInstructions.length>11) {
      danceState.danceInstructions.shift();
    }
    // remove oldest from dom
    var updatedEmList = document.querySelectorAll("#danceinstructor em");
    updatedEmList[0].parentNode.removeChild(updatedEmList[0]);
    // add new to dom
    var newDanceEm = document.createElement("em");
    var textnode = document.createTextNode(newDanceMove);

    newDanceEm.appendChild(textnode);
    newDanceEm.classList.add("color"+newDanceMove);
    newDanceEm.innerHTML = newDanceEm.innerHTML + `<img src="images/lamp.svg" alt="lamp">`;
    updatedEmList[4].parentNode.appendChild(newDanceEm);
    //add active class to currentmove
    updatedEmList[5].classList.add("currentdancemove");
    updatedEmList[4].classList.remove("currentdancemove");
    updatedEmList[4].classList.add("movedone");
    //console.log(danceState.danceInstructions[4]);
    // debugger
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
