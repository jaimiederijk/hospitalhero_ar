var danceHtmlElements = {
  points : document.querySelector('#dancepoints'),
  danceButtons : document.querySelectorAll('.dancebuttons'),
  danceInstructor : document.querySelectorAll("#danceinstructor em"),
  pause : document.querySelector('#dancepause'),
  danceLight : document.querySelector('#dancelights'),
  danceInstructorHighlight : document.querySelector('#danceinstructorhighlight')
}
var danceState = {
  points: 0,
  speed:1500,
  startStop: false,
  danceMoves: ["A","B","C","D"],
  danceInstructions:["A","D","D","B","B","D","D"],
  currentDanceMove: "B"

}


// setup adds click event to buttons
// each click event triggers a check if currentbutton is the same as currentdance move checked by the letter
// if true

var ioStuff = {
  origin : window.location.origin,
  socket : io.connect(this.origin),
  startListeners : () => {
    ioStuff.socket.on('news', function (data) {
      console.log(data);
    });
  },
  pointsChange : (data) => {
    ioStuff.socket.emit('pointchange',data)
      // socket.emit('my other event', { my: 'data' });

  }
}

var setup = () => {
  // document.querySelector("#avatar").style["animation-duration"] = danceState.speed/1000 +"s";
  // for (var s = 0; s < danceHtmlElements.length; s++) {
  //   danceHtmlElements.danceInstructor[s].style.transition = "left " + danceState.speed/1000 + "s";
  // }
  ioStuff.startListeners();
  for (var i = 0; i < danceHtmlElements.danceButtons.length; i++) {
    console.log("add event");
    danceHtmlElements.danceButtons[i].addEventListener("click",(e)=>{
      console.log("click");
    //  console.log(danceState.currentDanceMove + "  " + danceState.danceInstructions);
      if (e.currentTarget.innerHTML == danceState.currentDanceMove) {
        var currentDanceMove = document.querySelector(".currentdancemove");

        if (!currentDanceMove.classList.contains("gothim")) {
          console.log("add point");
          currentDanceMove.classList.add("gothim");
          var currentHighlight = document.querySelectorAll("#danceinstructorhighlight em");
          currentHighlight[1].classList.add("gothim");
          var currentLamps = document.querySelectorAll(".lamp div");
          currentLamps[2].classList.add("gothim");
          updatePoints();
        } else {// wrong button

        }
      }
    })
  }
   startGame();
}

var startGame = () => {
  var removeAndAddLamps = (color) => {
    var updatedLampList = document.querySelectorAll("#dancelights .lamp");

    updatedLampList[1].parentNode.removeChild(updatedLampList[0]);

    var newLamp = document.createElement("div");
    newLamp.innerHTML = `<img src="images/lamp.svg" alt="lamp">
      <div class="beamoflight"></div>`;
    newLamp.classList.add("lamp");
    newLamp.classList.add("color" + color)
    // debugger
    updatedLampList[2].parentNode.appendChild(newLamp);
  }
  var addDanceHighlight = (newem) =>{
    updateddanceInstructorHighlightEm = document.querySelectorAll("#danceinstructorhighlight em");
    var clonedEm = newem.cloneNode(false);
    updateddanceInstructorHighlightEm[1].parentNode.removeChild(updateddanceInstructorHighlightEm[0])
    updateddanceInstructorHighlightEm[1].parentNode.appendChild(clonedEm);

  }
  var danceInterval = setInterval( (e)=>{
    //select next move
    var nr = Math.floor(Math.random() * 4);
    var newDanceMove = danceState.danceMoves[nr];
    //add newmove
    danceState.danceInstructions.push(newDanceMove);
    // if longer remove oldest
    //if (danceState.danceInstructions.length>7) {
      danceState.danceInstructions.shift();
    //}
    // remove oldest from dom
    var updatedEmList = document.querySelectorAll("#danceinstructor em");
    updatedEmList[0].parentNode.removeChild(updatedEmList[0]);
    // add new to dom
    var newDanceEm = document.createElement("em");
    var textnode = document.createTextNode(newDanceMove);

    newDanceEm.appendChild(textnode);
    newDanceEm.classList.add("color"+newDanceMove);
    newDanceEm.innerHTML = newDanceEm.innerHTML ;//+ `<img src="images/lamp.svg" alt="lamp">`
    // newDanceEm.style.transition = "left " + danceState.speed/1000 + "s";
    updatedEmList[3].parentNode.appendChild(newDanceEm);
    //add active class to currentmove
    updatedEmList[4].classList.add("currentdancemove");
    updatedEmList[3].classList.remove("currentdancemove");
    updatedEmList[3].classList.add("movedone");
    //console.log(danceState.danceInstructions[4]);
    // debugger
    danceState.currentDanceMove = danceState.danceInstructions[3];
    removeAndAddLamps(danceState.danceInstructions[5]);
    addDanceHighlight(updatedEmList[5])
  },danceState.speed);

  // danceHtmlElements.pause.addEventListener("click",(e)=>{
  //   if (e.currentTarget.classList.contains("paused")) {
  //     danceInterval = setInterval( (e)=>{
  //       var nr = Math.floor(Math.random() * 6);
  //       danceHtmlElements.danceInstructor.innerHTML = danceState.danceMoves[nr];
  //       danceState.currentDanceMove = danceState.danceMoves[nr];
  //     },1000);
  //     e.currentTarget.classList.remove("paused");
  //   } else {
  //     clearInterval(danceInterval);
  //     e.currentTarget.classList.add("paused");
  //   }
  // })
}
var updatePoints = () => {
  if (danceHtmlElements.points) {
    danceState.points = danceState.points + 1;
    danceHtmlElements.points.innerHTML = danceState.points;
    ioStuff.pointsChange({newPoints: danceState.points});
    // setTimeout(()=>{
    //   void danceHtmlElements.points.parentNode.offsetWidth;
    //   danceHtmlElements.points.parentNode.classList.add("eatdance");
    //   setTimeout(()=>{
    //     void danceHtmlElements.points.parentNode.offsetWidth;
    //     danceHtmlElements.points.parentNode.classList.remove("eatdance");
    //   },1500)
    //
    //
    // },4500)

  }
}

setup();
