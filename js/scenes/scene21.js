
AFRAME.registerComponent("sun-shooting",{
  init : function(){
    this.totalSunShot = 9;
    this.scoreboard = document.getElementById("scoreboard");
    this.aivideo = document.getElementById("ai3-video");
    this.controllers = {
      "rightHand" : document.getElementById("rightHand"),
      "leftHand" : document.getElementById("leftHand")
    }
    this.sunwrapper = document.getElementById("sunwrapper");
    this.controllers.rightHand.addEventListener("menudown",this.manageIntro);
    this.aivideo.onended = function(){
      window.location = "scene3.html";
    }
    var realSun = document.getElementById("real-sun");
    realSun.addEventListener("collide",function(){
      window.location = "scene21.html";
    })
  },

  manageIntro : function(evt){
    var scene2intro = document.getElementById("scene2-intro"),
        huds = document.getElementById("scene2-huds");
    scene2intro.setAttribute("visible","false");
    huds.setAttribute("visible","true");
  }
})
(function () {
  // switch to stereoscopic mode directly on page load, this needs to be after the a-scene loads.
  var scene = document.querySelector('a-scene');
  if (scene.hasLoaded) {
    scene.enterVR();
  } else {
    scene.addEventListener('loaded', function () {
       setTimeout(function () {
           scene.enterVR();
       }, 1000);
    });
  };
})();