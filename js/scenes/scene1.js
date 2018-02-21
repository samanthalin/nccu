
AFRAME.registerComponent('room', {

	init : function(){
    var wallpaper = document.getElementById('wallpaper'),
    		grandmaMsg = document.getElementById("grandmaMsg"),
        replaySection = document.getElementById("replay-section"),
        replayBtn = document.getElementById("replayBtn"),
    		closeBtn = document.getElementById("closeBtn"),
    		player = document.getElementById("video-player"),
        newsVideo = document.getElementById("news-video"),
    		grandmaVideo = document.getElementById("grandma-video"),
    		audio = document.getElementById("ding"),
        currentVideo = "news",
        finish = document.getElementById("finish");

    newsVideo.onended = function(){
      replaySection.setAttribute("visible",true);
      player.setAttribute("visible",false);
    }

    grandmaVideo.onended = function(){
      replaySection.setAttribute("visible",true);
      player.setAttribute("visible",false);
    }

    replayBtn.addEventListener("grab-start",function(){
      replaySection.setAttribute("visible",false);
      console.log("replay", player.attributes["src"].value)
      player.setAttribute("visible",true);
      if(player.attributes["src"].value == "#news-video"){
        newsVideo.play();
      }else if(player.attributes["src"].value == "#grandma-video"){
        grandmaVideo.play();
      }
    })

    closeBtn.addEventListener("grab-start",function(){
      replaySection.setAttribute("visible",false);
      console.log("close", player.attributes["src"].value)
      if(player.attributes["src"].value == "#news-video"){
        setTimeout(function(){
          player.setAttribute("src","#grandma-video");
          grandmaMsg.setAttribute("visible",true);
          audio.play();
          grandmaMsg.addEventListener("grab-start",function(){
            player.setAttribute("visible",true);
            grandmaMsg.setAttribute("visible",false);
            grandmaVideo.play();
          })
        },3000)
      }
    })

    

    setTimeout(function(){
      wallpaper.setAttribute("visible", true);
      player.setAttribute("visible",true);
      newsVideo.play();
    },10000);

    finish.addEventListener("grab-start",function(){
      window.location = "scene2.html";
    })

	}
})

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