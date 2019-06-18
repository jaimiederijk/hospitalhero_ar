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
  bMarker : document.querySelector('#bmarker'),
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
    name:"Rode Aardvark",
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
    name:"Gele Aardvark",
    img:"/images/aardvarkyellow.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 1"
      obj-model="obj: url(/images/aardvark_yellow/tinker.obj);
      mtl: url(/images/aardvark_yellow/obj.mtl)">
    </a-entity>`,
    visableAtMarker:false,
    catched:false,
  },{
    name:"Groene Aardvark",
    img:"/images/aardvarkgreen.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 1"
      obj-model="obj: url(/images/aardvark_green/tinker.obj);
      mtl: url(/images/aardvark_green/obj.mtl)">
    </a-entity>`,
    visableAtMarker:false,
    catched:false,
  },
  // {
  //   name:"Dodo",
  //   img:"/images/dodo.png",
  //   aentity:`<a-entity
  //     scale="0.02 0.02 0.02"
  //     rotation="0 180 -150"
  //     position="0 0 1"
  //     obj-model="obj: url(/images/mybox/tinker.obj);
  //     mtl: url(/images/mybox/obj.mtl)">
  //   </a-entity>`,
  //   visableAtMarker:false,
  //   catched:false,
  // }
]

var markers = [
  {
    name:"hiroMarker",
    figureAtMarker:false,
    whichFigure:false,
    pointingAtMarker:false,
  },
  {
    name:"bMarker",
    figureAtMarker:false,
    whichFigure:false,
    pointingAtMarker:false,
  }
]

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

  // catchsystem
  if (catchButton) {
    catchButton.addEventListener("click",(e)=>{
      // if there is a figure and its being pointed at
      for (var i = 0; i < markers.length; i++) {
        // markers[i]
        if (markers[i].figureAtMarker && markers[i].pointingAtMarker) {
          // which figure has been caught
          figures[markers[i].whichFigure].catched = true;
          // set catched to true
          // add figure to bag
          createFiguresList();

          // remove 3d figure because catched
          htmlElements[markers[i].name].innerHTML = "";
          console.log("catch figure");
          catchButton.classList.add("nonactive");
        }
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
    for (var t = 0; t < markers.length; t++) {
      //add param
      htmlElements[markers[t].name].markerIndex = t;
      //marker in frame
      htmlElements[markers[t].name].addEventListener("markerFound", (e)=>{
        markers[e.currentTarget.markerIndex].pointingAtMarker = true;

        // if there is a figure at the currenmarker
        if (markers[e.currentTarget.markerIndex].figureAtMarker) {

          catchButton.classList.remove("nonactive");
        }

      })

      htmlElements[markers[t].name].addEventListener("markerLost", (e)=>{

        //no marker in sight
        markers[e.currentTarget.markerIndex].pointingAtMarker = false;
        console.log("lose marker");
        catchButton.classList.add("nonactive");
      })
    }

  }
}
// randomly move figures around the different markers
var moveFigures = () => {
  var randomlyMoveAround = (figureIndex) => {
    setTimeout((e) => {
      var foundEmptyMarker = false;
      // if no figure call figure
      for (var u = 0; u < markers.length; u++) {
        // find empty marker
        if (!markers[u].figureAtMarker) {
          markers[u].figureAtMarker = true;
          foundEmptyMarker = true;
          figureStay(figureIndex, u);
          console.log("figuresstay "+ figureIndex+ " called on:" + markers[u].name);
          break;
        }
      }
      // did not find empty marker
      if (!foundEmptyMarker) {
        console.log("try move again "+ figureIndex);
        randomlyMoveAround(figureIndex);
      }
    },Math.random() * 10000)
  }

  // function that sets a figure and then removes it
  var figureStay = (figureIndex, markerIndex) => {
    // if figure has not been catched
    if (!figures[figureIndex].catched) {
      htmlElements[markers[markerIndex].name].innerHTML = figures[figureIndex].aentity;

      markers[markerIndex].whichFigure = figureIndex;
      if (markers[markerIndex].pointingAtMarker) {
        catchButton.classList.remove("nonactive");
      }
      setTimeout((e) =>{
        // after timeout deactivate figure
        console.log(figureIndex +" :F and M: "+markerIndex);
        htmlElements[markers[markerIndex].name].innerHTML = "";
        markers[markerIndex].figureAtMarker = false;
        markers[markerIndex].whichFigure = false;
        //remove nonactive unless a other figure is visable
        var otherMarkersWithFigures = false;
        for (var r = 0; r < markers.length; r++) {
          // a figure at marker and pointing at marker
          if (markers[r].figureAtMarker && markers[r].pointingAtMarker) {
            otherMarkersWithFigures = true;
          }
        }
        if (!otherMarkersWithFigures) {
          catchButton.classList.add("nonactive");
        }
        
        console.log("try move again after apearence"+ figureIndex);
        randomlyMoveAround(figureIndex);
      }, 5000)
    }

  }

  randomlyMoveAround(0);
  randomlyMoveAround(1);
  randomlyMoveAround(2);
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
