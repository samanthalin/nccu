AFRAME.registerComponent("falling-electrons",{
	schema: {
    samplecount: {
      type: 'int',
      default: 100
    },
    blueColor : {
    	type : "string",
    	default : "#0000FF"
    },
    blueScore : {
    	type : "int",
    	default : 5
    },
    greenColor : {
    	type : "string",
    	default : "#00FF00"
    },
    greenScore : {
    	type : "int",
    	default : 3
    },
    orangeColor : {
    	type : "string",
    	default : "#ff4e48"
    },
    orangeScore : {
    	type : "int",
    	default : 2
    },
    redColor : {
    	type : "string",
    	default : "#FF0000"
    },
    redScore : {
    	type : "int",
    	default : 1
    }
  },
	init : function(){
		var electronWrapper = document.createElement("a-entity");
		this.totalElectronsFallen = 0;
		electronWrapper.id = "electron-wrapper";
		for(i = 0; i < this.data.samplecount; i++){
			var color,
					colorName;
			if((i % 4) == 0){
				color = this.data.blueColor;
				colorName = "blue";
			}else if((i % 3) == 0){
				color = this.data.greenColor;
				colorName = "green";
			}else if((i % 2) == 0){
				color = this.data.orangeColor;
				colorName = "orange";
			}else if((i % 1) == 0){
				color = this.data.redColor;
				colorName = "red";
			}
			var elec = this.getElectron(color, colorName, i);
			electronWrapper.appendChild(elec);
		}
		this.el.appendChild(electronWrapper);
		this.electronFallingTimer = setInterval(this.makeElectronsFall, 3000);
	},

	makeElectronsFall : function(){
		var number = getRandomInteger(1,3);
		this.totalElectronsFallen += number;
		for(i = 0; i <= number; i++){
			var electronNumber = getRandomInteger(1,101);
			var electron = document.querySelector('a-sphere[data-index="' + electronNumber + '"]');
			electron.setAttribute("visible","true");
			electron.emit("dropElectron");
		}
		if(this.electronNumber >= 100){
			clearInterval(this.electronFallingTimer);
		}
	},

	getElectron : function(color, colorName, idx){
		var electron = document.createElement("a-sphere");
		electron.setAttribute("class", colorName + " electron");
		electron.setAttribute("data-index", idx);
		electron.setAttribute("radius", 0.1);
		electron.setAttribute("material","color:" + color);
		electron.setAttribute("visible","false");
		var position = {
			x : getRandomArbitrary(2,-2),
			y : 10,
			z : getRandomArbitrary(1.5, -1.5)
		}
		electron.setAttribute("position",position);
		position.y = -20
		electron.setAttribute("animation__drop" + idx, {"property" : "position", "startEvents" : "dropElectron", "to" : position, "dur" : 10000 })
		return electron;
	}
})

var getRandomArbitrary = function(max, min) {
  return Math.random() * (max - min) + min;
}

var getRandomInteger = function(min, max){
	min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}










