var menuButton = document.querySelector('#menubutton');
var hiroMarker = document.querySelector('#hiromarker');
var catchButton = document.querySelector('#catchbutton');
var closeMenuButton = document.querySelector('#closemenubutton');
var shadowImages = document.querySelectorAll('.shadowimg');
var aardVarkImg = document.querySelector('#aardvarkimg');
var menu = document.querySelector('#menu');
var aScene = document.querySelector('a-scene');


menuButton.addEventListener("click",(e)=>{
  menu.classList.remove("hidden");
  menubutton.classList.add("hidden");
})
closeMenuButton.addEventListener("click",(e)=>{
  menu.classList.add("hidden");
  menubutton.classList.remove("hidden");
})

catchButton.addEventListener("click",(e)=>{
  for (var i = 0; i < shadowImages.length; i++) {
    shadowImages[i].classList.add("hidden");
  }
  aardVarkImg.classList.remove("hidden");
  aScene.classList.add("tiny");
  catchButton.classList.add("nonactive");
})


hiroMarker.addEventListener("markerFound", (e)=>{
  console.log("hiro found");
  catchButton.classList.remove("nonactive");
})
hiroMarker.addEventListener("markerLost", (e)=>{
  console.log("hiro lost");
  catchButton.classList.add("nonactive");
})
var onStartSetup = () => {
  menu.classList.add("hidden");
  catchButton.classList.add("nonactive");
  aardVarkImg.classList.add("hidden");
};
onStartSetup();
