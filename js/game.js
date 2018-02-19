
AFRAME.registerComponent('room', {

	init : function(){
    var wallpaper = document.getElementById('wallpaper'),
    		message1 = document.getElementById("message1"),
    		message2 = document.getElementById("message2"),
    		message3 = document.getElementById("message3"),
    		newMessageIcon = document.getElementById("new-message-icon"),
    		replayBtn = document.getElementById("replay-message"),
    		player = document.getElementById("video1"),
    		video = document.getElementById("video"),
    		audio = document.getElementById("ding"),
        bookShelf = document.getElementById("book-shelf"),
    		bookonshelf = document.getElementById("bookonshelf"),
        book = document.getElementById("book"),
    		secret = document.getElementById("secret"),
    		bedroom = document.getElementById("bedroom"),
        finish = document.getElementById("finish"),
        rightHandController = document.getElementById("rightHand"),
        scene1 = document.getElementById("scene1"),
        scene = this.el;

    wallpaper.setAttribute("visible", true);

    message1.addEventListener("click",function(){
    	this.setAttribute("visible",false);
    	message2.setAttribute("visible", true);
    	audio.play();
    	video.setAttribute("src","video/video.mp4");
    })
    video.onended = function(){
  		player.setAttribute("visible",false);
  		message3.setAttribute("visible",true);
  	}
    newMessageIcon.addEventListener("click",function(){
    	message2.setAttribute("visible",false);
    	player.setAttribute("visible",true);
    	video.play();
    })
    replayBtn.addEventListener("click",function(){
    	message3.setAttribute("visible",false);
    	player.setAttribute("visible",true);
    	video.play();
    })
    console.log(finish);
    finish.addEventListener("grab-start",function(){
      bedroom.setAttribute("scale","0 0 0");
      scene1.setAttribute("visible","false");
      scene2(scene);
    })
    bedroom.setAttribute("scale","0 0 0");
      scene1.setAttribute("visible","false");
      scene2(scene);

    // bedroom.setAttribute("visible", false);
    // bedroom.setAttribute("scale","0 0 0")
    // scene3(scene);

	}
})

var scene2 = function(scene){
  var totalSunShot = 9,
      sky = document.querySelector("a-sky")
      scene2 = document.getElementById("scene2"),
      scene2Camera = document.getElementById("scene2-camera"),
      scoreboard = document.getElementById("scoreboard"),
      intro = document.getElementById("scene2-intro"),
      introDisplay = true,
      huds = document.getElementById("scene2-huds"),
      rightHandController = document.getElementById("rightHand"),
      sunwrapper = document.getElementById("sunwrapper");
  this.prepare = function(){
    for (var i = 1; i < 10; i++) {
      var sun = document.createElement('a-sphere'),
          sunlight = document.createElement('a-entity'),
          pos =  {x: Math.random() * 20 - 10, y: Math.random() * 20 + 2, z: Math.random() * 20 - 10};
      sun.setAttribute("radius", '0.5')
      sun.setAttribute('material', {shader: 'flat'});
      sun.setAttribute('light', {type: 'point', color: '#FFF'});
      sun.setAttribute('position',pos);
      sun.setAttribute("class", "sun clickable");
      sun.setAttribute("data-index",i);
      sun.setAttribute("data-shot",false);
      sun.setAttribute("animation__expand" + i, {"property" : "radius", "startEvents" : "sunShot", "to" : "2", "dur" : "200"})
      sun.setAttribute("animation__fadeout" + i, {"property" : "material.opacity", "startEvents" : "sunShot", "to" : "0", "dur" : "300", "from" : "1", "easing": "linear"});

      sun.addEventListener("click",function(){
         this.emit("sunShot");
      })
      var sunEl;
      sun.addEventListener("sunShot",function(){
        sunEl = this;
        if(this.attributes["data-shot"].value == "false"){
          totalSunShot--;
          scoreboard.setAttribute("value",totalSunShot + " / 9 Left");
          if(totalSunShot == 0){
            // $("#alien-message").fadeIn();
            // scene3(scene);
          }
          setTimeout(function(){
            sunwrapper.removeChild(sunEl);
          },500);
        }
      })
      sunwrapper.appendChild(sun);
    }
    sky.setAttribute("src", "#snow-img");
    scene2.setAttribute("visible","true");
    scene2Camera.setAttribute("visible","true");
  }

  rightHandController.addEventListener("menudown",function(){
    if(introDisplay){
      intro.setAttribute("visible","false");
      huds.setAttribute("visible","true");
    }else{
      intro.setAttribute("visible","true");
      huds.setAttribute("visible","false");
    }
  })

  this.prepare();
}

var scene3 = function(scene){
  var sky = document.querySelector("a-sky"),
      sunwrapper = document.getElementById("sunwrapper"),
      counter = $("#scoreboard .counter"),
      totalSunShot = 0;
  this.prepare = function(){
    $("#desert").remove();
    while (sunwrapper.firstChild) {
      sunwrapper.removeChild(sunwrapper.firstChild);
    }
    $("a-assets").append("<img id='snow-img' src='bg/snow.jpg' />");
    counter.text("0");
    sky.setAttribute("src", "#snow-img")
    for (var i = 1; i < 10; i++) {
      var sun = document.createElement('a-sphere'),
          sunlight = document.createElement('a-entity'),
          pos =  {x: Math.random() * 20 - 10, y: Math.random() * 20 + 2, z: Math.random() * 20 - 10};
      sun.setAttribute("radius", '0.5');
      sun.setAttribute('material', {shader: 'flat'});
      sun.setAttribute('light', {type: 'point', color: '#FFF'});
      sun.setAttribute('position',pos);
      sun.setAttribute("class", "sun clickable");
      sun.setAttribute("data-index",i);
      sun.setAttribute("data-shot",false);
      sun.setAttribute("animation__expand" + i, {"property" : "radius", "startEvents" : "sunShot", "to" : "2", "dur" : "200"})
      sun.setAttribute("animation__fadeout" + i, {"property" : "material.opacity", "startEvents" : "sunShot", "to" : "0", "dur" : "300", "from" : "1", "easing": "linear"});

      sun.addEventListener("click",function(){
         this.emit("sunShot");
      })
      var sunEl;
      sun.addEventListener("sunShot",function(){
        sunEl = this;
        if(this.attributes["data-shot"].value == "false"){
          totalSunShot++;
          counter.text(totalSunShot);
          if(totalSunShot >= 9){
            $("#backdrop").fadeIn();
            scene4(scene);
          }
          setTimeout(function(){
            sunwrapper.removeChild(sunEl);
          },500);

        }
      })
      sunwrapper.appendChild(sun);
    }
    setTimeout(function(){
      $("#alien-message").fadeOut();
    },10000)
  }
  this.prepare();
}

var scene4 = function(scene){
  var bedroom = document.getElementById("bedroom"),
      message2 = document.getElementById("message2"),
      message3 = document.getElementById("message3"),
      message1 = document.getElementById("message1"),
      video1 = document.getElementById("video1");

  this.prepare = function(){
    bedroom.setAttribute("scale","1 1 1");
    message2.setAttribute("visible",true);
    message1.setAttribute("visible",false);
    message3.setAttribute("visible",false);
    video1.setAttribute("src","video/video.mp4");

    setTimeout(function(){
      $("#backdrop").fadeOut();
    }, 3000);
  }
  this.prepare();
}
// (function () {
//      // switch to stereoscopic mode directly on page load, this needs to be after the a-scene loads.
//      var scene = document.querySelector('a-scene');
//      if (scene.hasLoaded) {
//          scene.enterVR();
//      } else {
//          scene.addEventListener('loaded', function () {
//              setTimeout(function () {
//                  scene.enterVR();
//              }, 1000);
//          });
//      };
//  })();