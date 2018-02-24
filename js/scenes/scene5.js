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
		console.log(this.data.samplecount);
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
		this.electronFallingTimer = setInterval(this.makeElectronsFall, 1000);
	},

	makeElectronsFall : function(){
		var number = this.getRandomInteger(1,6);
		this.totalElectronsFallen += number;
		for(i = 0; i <= number; i++){
			var electronNumber = this.getRandomInteger(1,101);
			var electron = document.querySelector('a-sphere[data-index="' + electronNumber + '"]');
			electron.setAttribute("visible","true");
			electron.setAttribute("dynamic-body", "mass:0.1;");
		}
		if(this.electronNumber >= 100){
			clearInterval(this.electronFallingTimer);
		}
	},

	getElectron : function(color, colorName, idx){
		var electron = document.createElement("a-sphere");
		electron.setAttribute("class", colorName + " electron");
		electron.setAttribute("data-index", idx);
		electron.setAttribute("radius", 0.72);
		electron.setAttribute("visible","false");
		var position = {
			x : this.getRandomArbitrary(2,-2),
			y : 10,
			z : this.getRandomArbitrary(1.5, -1.5)
		}
		electron.setAttribute("position",position);
		return electron;
	},

	getRandomArbitrary : function(max, min) {
	  return Math.random() * (max - min) + min;
	},

	getRandomInteger : function(min, max){
		min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}
})

//4 3










