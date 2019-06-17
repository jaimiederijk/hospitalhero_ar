var htmlElements = {
  menuButton : document.querySelector('#menubutton'),
  hiroMarker : document.querySelector('#hiromarker'),
  catchButton : document.querySelector('#catchbutton'),
  closeMenuButton : document.querySelector('#closemenubutton'),
  shadowImages : document.querySelectorAll('.shadowimg'),
  aardVarkImg : document.querySelector('#aardvarkimg'),
  menu : document.querySelector('#menu'),
  aScene : document.querySelector('a-scene'),
  ul : document.querySelector('#menu ul'),
};

var menuButton = document.querySelector('#menubutton');
var hiroMarker = document.querySelector('#hiromarker');
var catchButton = document.querySelector('#catchbutton');
var closeMenuButton = document.querySelector('#closemenubutton');
var shadowImages = document.querySelectorAll('.shadowimg');
var aardVarkImg = document.querySelector('#aardvarkimg');
var menu = document.querySelector('#menu');
var aScene = document.querySelector('a-scene');

var app = {

}
// array of figures that can be captured
var figures = [
  {
    name:"Aardvark",
    img:"/images/aardvark.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 1"
      obj-model="obj: url(/images/mybox/tinker.obj);
      mtl: url(/images/mybox/obj.mtl)">
    </a-entity>`,
    visableAtMarker:false,
    catched:false,
  },{
    name:"Dodo",
    img:"/images/dodo.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 1"
      obj-model="obj: url(/images/mybox/tinker.obj);
      mtl: url(/images/mybox/obj.mtl)">
    </a-entity>`,
    visableAtMarker:false,
    catched:false,
  }
]

var markers = [
  {
    name:"hiroMarker",
    figureAtMarker:false,
    whichFigure:false,
    pointingAtMarker:false,
  }
]

var addListeners = () => {
  if (menuButton) {
    // openmenu
    menuButton.addEventListener("click",(e)=>{
      menu.classList.remove("hidden");
      menubutton.classList.add("hidden");
      catchButton.classList.add("hidden");
    })
    // closemenu
    closeMenuButton.addEventListener("click",(e)=>{
      menu.classList.add("hidden");
      menubutton.classList.remove("hidden");
      catchButton.classList.remove("hidden");
    })
  }

  var createFiguresList = () => {
    var liString = "";
    for (var i = 0; i < figures.length; i++) {
      if (figures[i].catched) {
        liString +=`<li><img class="animalimg" id="aardvarkimg" src="`+ figures[i].img +`" alt="aardvark">
          <h2>`+ figures[i].name +`</h2>
        </li>`;
      }
    }
    htmlElements.ul.innerHTML = liString;
  }
  // catchsystem
  if (catchButton) {
    catchButton.addEventListener("click",(e)=>{
      // if there is a figure and its being pointed at
      if (markers[0].figureAtMarker && markers[0].pointingAtMarker) {
        // which figure has been caught
        figures[markers[0].whichFigure].catched = true;
        // set catched to true
        // add figure to bag
        createFiguresList();

        // remove 3d figure
        hiroMarker.innerHTML = "";
        catchButton.classList.add("nonactive");
      }
      // for (var i = 0; i < shadowImages.length; i++) {
      //   shadowImages[i].classList.add("hidden");
      // }
      // aardVarkImg.classList.remove("hidden");
      // aScene.classList.add("tiny");
      // catchButton.classList.add("nonactive");
    })
  }
  // if marker is in the frame
  if (hiroMarker) {
    hiroMarker.addEventListener("markerFound", (e)=>{
      markers[0].pointingAtMarker = true;
      // console.log("hiro found");
      if (markers[0].figureAtMarker) {

        catchButton.classList.remove("nonactive");
      }

    })
    hiroMarker.addEventListener("markerLost", (e)=>{
      // console.log("hiro lost");
      markers[0].pointingAtMarker = false;
      catchButton.classList.add("nonactive");
    })
  }
}
// randomly move figures around the different markers
var moveFigures = () => {
  var randomlyMoveAround = () => {
    setTimeout((e) => {
      // if no figure call figure
      if (hiroMarker.innerText=="") {
        figureStay(0);
        console.log("figuresstay called");
      }
      else {
        console.log("try move again");
        randomlyMoveAround();
      }
    },Math.random() * 10000)
  }

  // function that sets a figure and then removes it
  var figureStay = (figureIndex) => {
    // if figure has not been catched
    if (!figures[figureIndex].catched) {
      hiroMarker.innerHTML = figures[figureIndex].aentity;
      markers[0].figureAtMarker = true;
      markers[0].whichFigure = figureIndex;
      if (markers[0].pointingAtMarker) {
        catchButton.classList.remove("nonactive");
      }
      setTimeout((e) =>{
        // after timeout deactivate figure
        hiroMarker.innerHTML = "";
        markers[0].figureAtMarker = false;
        markers[0].whichFigure = false;
        catchButton.classList.add("nonactive");
        randomlyMoveAround();
      }, 5000)
    }

  }

  randomlyMoveAround();
}

var onStartSetup = () => {
  if (menu) {
    menu.classList.add("hidden");

    // aardVarkImg.classList.add("hidden");
  }
  if (catchButton) {
    catchButton.classList.add("nonactive");
  }
  addListeners();
  moveFigures();
  // hiroMarker.innerHTML = figures[0].aentity;
};
onStartSetup();
