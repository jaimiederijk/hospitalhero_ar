var whackamoleHtmlElements = {
  points : document.querySelector('#molepoints'),
  moles : document.querySelectorAll('.mole'),
  pause : document.querySelector('#molepause'),
}
var whackamoleState = {
  points: 0,
  startStop: false,

}
var setup = () => {
  for (var i = 0; i < whackamoleHtmlElements.moles.length; i++) {
    whackamoleHtmlElements.moles[i].addEventListener("click",(e)=>{
      if (e.currentTarget.classList.contains("moleactive")) {
        whackamoleState.points = whackamoleState.points + 1;
        updatePoints();
        e.currentTarget.classList.remove("moleactive");
      }


    })
  }
  startGame();
}

var startGame = () => {
  var moleInterval = setInterval( (e)=>{
    var nr = Math.floor(Math.random() * 6);
    setTimeout((e) =>{
      whackamoleHtmlElements.moles[nr].classList.remove("moleactive");
    }, 1500)
    whackamoleHtmlElements.moles[nr].classList.add("moleactive");
  },1000);
  whackamoleHtmlElements.pause.addEventListener("click",(e)=>{
    if (e.currentTarget.classList.contains("paused")) {
      moleInterval = setInterval( (e)=>{
        var nr = Math.floor(Math.random() * 6);
        setTimeout((e) =>{
          whackamoleHtmlElements.moles[nr].classList.remove("moleactive");
        }, 1500)
        whackamoleHtmlElements.moles[nr].classList.add("moleactive");
      },1000);
      e.currentTarget.classList.remove("paused");
    } else {
      clearInterval(moleInterval);
      e.currentTarget.classList.add("paused");
    }
  })
}
var updatePoints = () => {
  if (whackamoleHtmlElements.points) {
    whackamoleHtmlElements.points.innerHTML = whackamoleState.points;
  }
}

setup();
