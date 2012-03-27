var Neum = window.Neum || {};

(function() {
	Neum.RandomHelper = function (min, max) {
		return (Math.floor(Math.random() * max) + min);
	}

	Neum.RecordLocalScore = function (pseudo) {
		var lsName = "neum_" + pseudo;
		var aScore = localStorage[lsName];
		if (typeof aScore == "object" && aScore.length >= 5) {
			scores.pop();
		}
		else if (typeof aScore != "object") {
			aScore = new Array();
		}

		aScore.push(Neum.Context.score);
		localStorage.setItem(lsName, aScore);
		return true;
	}

	Neum.MenuHelper = function(items) {
		this.items = items;
		var index = 0;
		var size = this.items.length;

		this.update = function(value) {
			index += value;
			valideIndex();
		}

		this.getItem = function() {
			return this.items[index];
		}

		this.getIndex = function() {
			return index;
		}

		function valideIndex() {
			if (index >= size) {
				index = 0;
			} else if (index < 0) {
				index = size - 1;
			}
		}
		
	}

	Neum.MouseHelper = function () {
		this.clicked = false; // true if left mouse button is down (OH RLY?) -> for sure :)
		this.dragging = false; // true if mouse is moving while clicked
		this.moving = true; // useless
		this.x = 0;
		this.y = 0;

		var self = this;

		this._onMouseDown = function (event) { self._onMouseStateChange(event, "click", true); }
	    this._onMouseUp = function (event) { self._onMouseStateChange(event, "click", false); }
	    this._onMouseMove = function (event) { self._onMouseStateChange(event, "move"); }
	    
	    document.addEventListener('mousedown', this._onMouseDown, false);
	    document.addEventListener('mouseup', this._onMouseUp, false);
	    document.addEventListener('mousemove', this._onMouseMove, false);
	}

	Neum.MouseHelper.prototype._onMouseStateChange = function (event, typeEvent, clicked) {
		event.preventDefault();

		if (typeEvent == "move")
		{
			this.x = jaws.mouse_x;
			this.y = jaws.mouse_y - Neum.Constants.MOUSE_OFFSET;
			if (this.clicked) {
				this.dragging = true;
			} else {
				this.dragging = false;
			}
		}
		
		if (typeEvent == "click" && clicked != undefined)
		{
			this.clicked = clicked;
		}
	}
	
	Neum.GeomHelper = function(){
		this.getAngle = function (px, py, mx, my){
			// Nom nom nom. Tasty trigo!
			var opp = my - py; // opposite
			var adj = mx - px; // adjacent
			var tan = opp/adj; // tangent = opposite / adjacent (cf. cah soh toa)

			var radianAngle = Math.atan(tan);
			var deg = 90 + this.radianToDegree(radianAngle);
			if (adj < 0) {
				deg = deg - 180;
			}
			return deg;
		}
		
		this.getLength = function(ax, ay, bx, by){
			var xaxb = ax - bx;
			var yayb = ay - by;
			return Math.sqrt(Math.pow(xaxb, 2) +  Math.pow(yayb, 2));
		}
		
		this.degreeToRadian = function(degreeAngle){
			return Math.PI * degreeAngle / 180.0;
		}
		
		this.radianToDegree = function(radianAngle){
			return 180.0 * radianAngle / Math.PI;
		}
		
		this.forceInsideCanvas = function(item) {
		      if(item.x < 0) { item.x = 0  }
		      if(item.rect().right > jaws.width) { item.x = jaws.width - item.width }
		      if(item.y < 0) { item.y = 0 }
		      if(item.rect().bottom  > jaws.height) { item.y = jaws.height - item.height }
		    }
	}
	
	Neum.DurationHelper = function(){
		var lastTime;
		
		this.getElapsedTime = function(){
			var diffDate = new Date();
			var time = diffDate.getTime() - lastTime.getTime();
			lastTime = new Date;
			return time;
		}
		
		this.initializeTimer = function(){
			lastTime = new Date;
		}
	}
	
	Neum.SoundHelper = function(){
		this.play = function(id){
			document.getElementById(id).play();
		}
	}
})();