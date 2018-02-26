AFRAME.registerComponent("virus-shooting",{
	init : function(){
		this.energybar = document.getElementById("energybar");
		this.energybar.setAttribute("value",totalEnergy);
	}
})