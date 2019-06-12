var htmlElements = {
  menuButton : document.querySelector('#menubutton'),
  hiroMarker : document.querySelector('#hiromarker'),
  catchButton : document.querySelector('#catchbutton'),
  closeMenuButton : document.querySelector('#closemenubutton'),
  shadowImages : document.querySelectorAll('.shadowimg'),
  aardVarkImg : document.querySelector('#aardvarkimg'),
  menu : document.querySelector('#menu'),
  aScene : document.querySelector('a-scene'),
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

var addListeners = () => {
  if (menuButton) {
    menuButton.addEventListener("click",(e)=>{
      menu.classList.remove("hidden");
      menubutton.classList.add("hidden");
    })
    closeMenuButton.addEventListener("click",(e)=>{
      menu.classList.add("hidden");
      menubutton.classList.remove("hidden");
    })
  }
  if (catchButton) {
    catchButton.addEventListener("click",(e)=>{
      for (var i = 0; i < shadowImages.length; i++) {
        shadowImages[i].classList.add("hidden");
      }
      aardVarkImg.classList.remove("hidden");
      aScene.classList.add("tiny");
      catchButton.classList.add("nonactive");
    })
  }
  if (hiroMarker) {
    hiroMarker.addEventListener("markerFound", (e)=>{
      console.log("hiro found");
      catchButton.classList.remove("nonactive");
    })
    hiroMarker.addEventListener("markerLost", (e)=>{
      console.log("hiro lost");
      catchButton.classList.add("nonactive");
    })
  }
}

var onStartSetup = () => {
  if (menu) {
    menu.classList.add("hidden");

    aardVarkImg.classList.add("hidden");
  }
  if (catchButton) {
    catchButton.classList.add("nonactive");
  }
  addListeners();
};
onStartSetup();
