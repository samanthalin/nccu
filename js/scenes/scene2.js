
AFRAME.registerComponent("sun-shooting",{
  init : function(){
    this.totalSunShot = 9;
    this.scoreboard = document.getElementById("scoreboard");
    this.controllers = {
      "rightHand" : document.getElementById("rightHand"),
      "leftHand" : document.getElementById("leftHand")
    }
    this.sunwrapper = document.getElementById("sunwrapper");
    this.controllers.rightHand.addEventListener("menudown",this.manageIntro);
    this.prepare();
  },

  prepare : function(){
    // for (var i = 1; i < 10; i++) {
    //   this.sunwrapper.appendChild(this.getSun(i));
    // }
  },

  getSun : function(sunIndex){
    var sun = document.createElement('a-sphere'),
        pos =  {x: Math.random() * 10 - 5, y: Math.random() * 10 + 2, z: Math.random() * (4 - 1)};
    sun.setAttribute("radius", '0.5');
    sun.setAttribute('material', {shader: 'flat'});
    sun.setAttribute('light', {type: 'point', color: '#FFF'});
    sun.setAttribute('position',pos);
    sun.setAttribute("class", "sun clickable");
    sun.setAttribute("data-index",sunIndex);
    sun.setAttribute("data-shot",false);
    sun.setAttribute("animation__expand" + sunIndex, {"property" : "radius", "startEvents" : "sunShot", "to" : "2", "dur" : "200"})
    sun.setAttribute("animation__fadeout" + sunIndex, {"property" : "material.opacity", "startEvents" : "sunShot", "to" : "0", "dur" : "300", "from" : "1", "easing": "linear"});
    sun.addEventListener("click",function(){
      sun.emit("sunShot");
    })
    var sunEl;
    sun.addEventListener("sunShot",function(){
      sunEl = this;
      if(sun.attributes["data-shot"].value == "false"){
        this.totalSunShot--;
        this.scoreboard.setAttribute("value",this.totalSunShot + " / 9 Left");
        if(this.totalSunShot == 0){
            
        }
        setTimeout(function(){
          this.sunwrapper.removeChild(sunEl);
        },500);
      }
    })

    return sun;
  },

  manageIntro : function(evt){
    var scene2intro = document.getElementById("scene2-intro"),
        huds = document.getElementById("scene2-huds");
    if(scene2intro.attributes["visible"].value == "true"){
      scene2intro.setAttribute("visible","false");
      huds.setAttribute("visible","true");
    }else if(scene2intro.attributes["visible"].value == "false"){
      scene2intro.setAttribute("visible","true");
      huds.setAttribute("visible","false");
    }
  }
})