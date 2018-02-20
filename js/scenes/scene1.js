
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
    finish.addEventListener("grab-start",function(){
      window.location = "scene2.html";
    })

	}
})


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