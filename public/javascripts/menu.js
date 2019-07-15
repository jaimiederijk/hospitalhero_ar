var htmlElements = {
  body : document.querySelector('body'),
  menuButton : document.querySelector('#menubutton'),
  hiroMarker : document.querySelector('#hiromarker'),
  catchButton : document.querySelector('#catchbutton'),
  closeMenuButton : document.querySelector('#closemenubutton'),
  shadowImages : document.querySelectorAll('.shadowimg'),
  aardVarkImg : document.querySelector('#aardvarkimg'),
  menu : document.querySelector('#menu'),
  aScene : document.querySelector('a-scene'),
  ul : document.querySelector('#menu ul'),
  aMarker : document.querySelector('#amarker'),
  bMarker : document.querySelector('#bmarker'),
  cMarker : document.querySelector('#cmarker'),
  dMarker : document.querySelector('#dmarker'),
  winCatching : document.querySelector('#wincatching'),
  catchCounter : document.querySelector('#menubutton em'),
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
  howManyCatched:0,
  timeBetweenApearences:5000,
  howManyActive:6,
  messageTime: 1500,
}
// array of figures that can be captured
var figures = [
  {
    name:"Rode Aardvark",
    img:"/images/aardvark.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/mybox/tinker.obj);
      mtl: url(/images/mybox/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Gele Aardvark",
    img:"/images/aardvarkyellow.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_yellow/tinker.obj);
      mtl: url(/images/aardvark_yellow/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Groene Aardvark",
    img:"/images/aardvarkgreen.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_green/tinker.obj);
      mtl: url(/images/aardvark_green/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Blauwe Aardvark",
    img:"/images/aardvarkblue.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_blue/tinker.obj);
      mtl: url(/images/aardvark_blue/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Paarse Aardvark",
    img:"/images/aardvarkpurple.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_purple/tinker.obj);
      mtl: url(/images/aardvark_purple/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Bruine Aardvark",
    img:"/images/aardvarkbrown.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_brown/tinker.obj);
      mtl: url(/images/aardvark_brown/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Oranje Aardvark",
    img:"/images/aardvarkorange.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_orange/tinker.obj);
      mtl: url(/images/aardvark_orange/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Zwarte Aardvark",
    img:"/images/aardvarkblack.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_black/tinker.obj);
      mtl: url(/images/aardvark_black/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Cyaan Aardvark",
    img:"/images/aardvarkcyan.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_cyan/tinker.obj);
      mtl: url(/images/aardvark_cyan/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Roze Aardvark",
    img:"/images/aardvarkpink.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_pink/tinker.obj);
      mtl: url(/images/aardvark_pink/obj.mtl)">
    </a-entity>`,
    catched:false,
  },{
    name:"Witte Aardvark",
    img:"/images/aardvarkwhite.png",
    aentity:`<a-entity
      scale="0.02 0.02 0.02"
      rotation="0 180 -150"
      position="0 0 -1"
      obj-model="obj: url(/images/aardvark_white/tinker.obj);
      mtl: url(/images/aardvark_white/obj.mtl)">
    </a-entity>`,
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
    name:"aMarker",
    figureAtMarker:false,
    whichFigure:false,
    pointingAtMarker:false,
  },
  {
    name:"bMarker",
    figureAtMarker:false,
    whichFigure:false,
    pointingAtMarker:false,
  },
  {
    name:"cMarker",
    figureAtMarker:false,
    whichFigure:false,
    pointingAtMarker:false,
  }
  ,
  {
    name:"dMarker",
    figureAtMarker:false,
    whichFigure:false,
    pointingAtMarker:false,
  }
]

var messages = {
  createMessage : (string) => {
    var messageBox = document.createElement("div");
    var p = document.createElement("p");

    var text = document.createTextNode(string);
    p.appendChild(text);
    messageBox.classList.add("messagebox");
    messageBox.appendChild(p);
    var cloud = document.createElement("div");
    cloud.innerHTML = `
`;
    messageBox.appendChild(cloud);
    htmlElements.body.appendChild(messageBox);

    setTimeout( (e)=> {
      htmlElements.body.removeChild(messageBox);
    },app.messageTime);
  },

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
          app.howManyCatched += 1;

          // send message
          messages.createMessage("Je hebt de "+ figures[markers[i].whichFigure].name + " gevangen");

          //app.timeBetweenApearences -= 1900;
          moveFigures.checkForCatchedFigures();
          htmlElements.catchCounter.innerHTML = app.howManyCatched;
          if (app.howManyCatched == 6) {
            //// Win
            htmlElements.winCatching.classList.remove("hidden");
          }
          // remove 3d figure because catched
          htmlElements[markers[i].name].innerHTML = "";
          console.log("catch figure");
          catchButton.classList.add("nonactive");
        }
      }

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
        console.log("which marker found:" + e.currentTarget.markerIndex);
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
var moveFigures = {
  checkForCatchedFigures : () => {
    var indexOfNewFigure = app.howManyCatched + app.howManyActive - 1;
    moveFigures.randomlyMoveAround(indexOfNewFigure);
  },
  randomlyMoveAround : (figureIndex) => {
    setTimeout((e) => {
      var foundEmptyMarker = false;
      //shuffle order of markers
      var shuffledArray = [];
      for (var q = 0; q < markers.length; q++) {
        shuffledArray.push(q)
      }
      shuffledArray.sort(() => 0.5 - Math.random())

      // if no figure call figure
      for (var u = 0; u < markers.length; u++) {
        // find empty marker
        if (!markers[shuffledArray[u]].figureAtMarker) {
          foundEmptyMarker = true;
          moveFigures.figureStay(figureIndex, shuffledArray[u]);
          console.log("figuresstay "+ figureIndex+ " called on:" + markers[shuffledArray[u]].name);
          break;
        }
      }
      // did not find empty marker
      if (!foundEmptyMarker) {
        console.log("try move again "+ figureIndex);
        moveFigures.randomlyMoveAround(figureIndex);
      }
    },Math.random() * app.timeBetweenApearences)
  },

  // function that sets a figure and then removes it
  figureStay : (figureIndex, markerIndex) => {
    // if figure has not been catched
    if (!figures[figureIndex].catched) {
      htmlElements[markers[markerIndex].name].innerHTML = figures[figureIndex].aentity;
      markers[markerIndex].figureAtMarker = true;
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
        moveFigures.randomlyMoveAround(figureIndex);
      }, 5000)
    }

  }

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
  //start all loops for 6 figures
  for (var k = 0; k < app.howManyActive; k++) {
    moveFigures.randomlyMoveAround(k);
  }
  // hiroMarker.innerHTML = figures[0].aentity;
};
onStartSetup();
