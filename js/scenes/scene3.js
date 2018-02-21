AFRAME.registerComponent("room",{
	init : function(){
		var drMsg = document.getElementById("drMsg"),
				drMsgBox = document.getElementById("drMsgBox"),
				replaySection = document.getElementById("replay-section"),
				replayBtn = document.getElementById("replayBtn"),
    		closeBtn = document.getElementById("closeBtn"),
				drVideo = document.getElementById("dr-video"),
				box = document.getElementById("box-cover"),
				boxGrabber = document.getElementById("box-grabber");
		setTimeout(function(){
			var audio = document.getElementById("ding");
			audio.play();
			drMsg.setAttribute("visible","true");
		},5000);
		drMsgBox.addEventListener("grab-start",this.playVideo);
		drVideo.onended = function(){
			replaySection.setAttribute("visible",true);
			box.setAttribute("visible",true);
		}
		replayBtn.addEventListener("grab-start", this.playVideo);
		closeBtn.addEventListener("grab-start",function(){
			var replaySection = document.getElementById("replay-section")
			replaySection.setAttribute("visible","true");
		})
		boxGrabber.addEventListener("grab-start",function(){
			window.location = "scene4.html";
		})
	},

	playVideo : function(){
		var drVideo = document.getElementById("dr-video");
		var player = document.getElementById("player");
		var replaySection = document.getElementById("replay-section")
		replaySection.setAttribute("visible",false);
		player.setAttribute("visible",true);
		drVideo.play();
	}
})