AFRAME.registerComponent("roof-top",{
	init : function(){
		var controllers = {
			"rightHand" : document.getElementById("rightHand"),
      "leftHand" : document.getElementById("leftHand")
		}
		var scoreboardDsplayed = false;
		var video = document.getElementById("drVideo");
		var score = {
			x : 0,
			y : 0,
			total : 0
		}
		var rotation = {x : 30, y: 105, z: 0};
		video.onended = function(){
			window.location = "scene5.html";
		}
		controllers.rightHand.addEventListener("trackpaddown",function(){
			if(!scoreboardDsplayed){
				rotation.x = rotation.x + 10;
				if(rotation.x == 360){
					rotation.x = 0;
				}
				var panels = document.querySelectorAll(".panel");
				panels.forEach(function(panel){
					panel.setAttribute("rotation",rotation);
				})
			}
		})

		controllers.leftHand.addEventListener("trackpaddown",function(){
			if(!scoreboardDsplayed){
				rotation.y = rotation.y + 5;
				if(rotation.y == 360){
					rotation.y = 0;
				}
				var panels = document.querySelectorAll(".panel");
				panels.forEach(function(panel){
					panel.setAttribute("rotation",rotation);
				})
			}
		})

		controllers.rightHand.addEventListener("triggerdown",function(){
			var sun = document.getElementById("sun");
			scoreboardDsplayed = true;
			score.x = Math.ceil(Math.abs(180 - rotation.x) * 8.333);
			score.y = Math.ceil(Math.abs(180 - Math.abs(rotation.y - 105)) * 8.333);
			score.total = score.x + score.y;
			sun.addEventListener("animationcomplete",function(){
				var scoreboard = document.getElementById("scoreboard");
				scoreboard.setAttribute("value","Total Energy Collected : " + score.total + " / 3000");
				scoreboard.setAttribute("visible", true);
				var video = document.getElementById("drVideo");
				var player = document.getElementById("player");
				player.setAttribute("visible","true");
				video.play();
			})
			sun.emit("sunset");
			window.localStorage.setItem("energy", score.total);
			
		})
	}
})