var Neum = window.Neum || {};
(function() {
	Neum.Player = function(x, y) {
		var sprite = new jaws.Sprite({x: x, y: y });
		var speed = Neum.Constants.PLAYER_SPEED_NORMAL;
		var shootInterval = Neum.Constants.PLAYER_SHOOT_SPEEDY;
		var canShoot = true;
		this.bulletList = new jaws.SpriteList();
		var angle;
		var freezeTime = 0;
		var freezed = false;

		this.playerAnimConfig = {
			sprite_sheet: Neum.Constants.IMG_PLAYER,
			frame_size: [32, 64],
			frame_duration: 200,
			orientation: "left"
		};

		var bulletAnimConfig = {
			sprite_sheet: Neum.Constants.IMG_BULLET,
			frame_size: [32, 32],
			frame_duration: 200,
			orientation: "left"
		} 


		this.setup = function () {
			jaws.context.mozImageSmoothingEnabled = false;

			var an5 = new jaws.Animation({
				sprite_sheet: Neum.Constants.IMG_PLAYER, frame_duration: 200, frame_size: [33, 64], orientation: "left"
			});
			
			sprite.animUp = an5.slice(0, 3);
			sprite.animDown = an5.slice(8, 11);
			sprite.animLeft = an5.slice(12, 15);
			sprite.animRight = an5.slice(4, 7);
			sprite.setImage(sprite.animDown.next());
		}

		this.animate = function (direction) {
			switch (direction) {
				case "up": sprite.setImage(sprite.animUp.next()); break;
				case "down": sprite.setImage(sprite.animDown.next()); break;
				case "left": sprite.setImage(sprite.animLeft.next()); break;
				case "right": sprite.setImage(sprite.animRight.next()); break;
			}
		} 


		this.update = function () {
			if(freezed){
				//console.log(freezeTime);
				freezeTime += Neum.Context.freezeTimer.getElapsedTime();
				if(freezeTime > Neum.Constants.FREEZE_TIME){
					freezed = false;
					sprite.alpha = 1;
				}
			}
			
			for (var i = 0, l = this.bulletList.sprites.length; i < l; i++) {
				var bullSprite = this.bulletList.sprites[i];
				var a = Neum.Constants.BULLET_SPEED_NORMAL / 2 * Math.cos(Neum.Context.geomHelper.degreeToRadian(bullSprite.angle-90));
				bullSprite.x += a; 
				bullSprite.y += a * Math.tan(Neum.Context.geomHelper.degreeToRadian(bullSprite.angle-90));
			}
			this.bulletList.deleteIf(function(sprite) {
				return sprite.x <= 0 
					|| sprite.y < 0
					|| sprite.x + sprite.width > jaws.width
					|| sprite.y + sprite.height > jaws.height
			});
			
			// Maj de la direction
			angle = Neum.Context.geomHelper.getAngle(sprite.x, sprite.y, Neum.Context.mouseHelper.x, Neum.Context.mouseHelper.y);
		}

		this.draw = function () {
			sprite.draw();
			for (var i = 0 ; i < this.bulletList.length ; i++) {
				this.bulletList.sprites[i].draw();
			}
			//this.bulletList.draw();
		}

		this.shoot = function()
		{
			if (canShoot)
			{
				canShoot = false;
				
				var pos = { x: sprite.x +sprite.width/2, y: sprite.y }
				var bullet = new jaws.Sprite({x: pos.x, y: pos.y, image: Neum.Constants.IMG_BULLET, angle: angle});
				this.bulletList.push(bullet);
				setTimeout(function (t) { canShoot = true; }, shootInterval);
				Neum.Context.soundHelper.play(Neum.Constants.SND_POP);
			}
		}

		this.freeze = function(){
			if(!freezed){
				freezed = true;
				freezeTime = 0;
				sprite.alpha = 0.5;
				Neum.Context.freezeTimer.initializeTimer();
				Neum.Context.soundHelper.play(Neum.Constants.SND_OUILLE);
			}
		}
		this.isFreezed = function(){ return freezed; }
		this.setX = function (x) { sprite.setX(x); }
      	this.setY = function (y) { sprite.setY(y); }
      	this.getX = function () { return sprite.x; }
      	this.getY = function () { return sprite.y; }

		this.addX = function (x) { return sprite.x += x; }
      	this.addY = function (y) { return sprite.y+= y; }
      	
      	this.getSpeed = function() { return speed; }
      	this.setSpeed = function(s) { speed = s; }
		
		this.getAngle = function(){	return angle; }
		this.setAngle = function(a){ angle = a; }
		this.forceInsideCanvas = function(){ Neum.Context.geomHelper.forceInsideCanvas(sprite); }

		this.getSprite = function () { return sprite;}
	}
})();