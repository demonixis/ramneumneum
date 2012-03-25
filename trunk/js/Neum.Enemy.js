var Neum = window.Neum || {};

(function() {
	Neum.EnemyList = function() {
		var listEnemy = new jaws.SpriteList();

		this.addEnemy = function (type, player)
		{
			var sprite, image, speed, animation;

			var spriteWidth = 0;
			var spriteHeight = 0;


			// Position aléatoire
			var position = { 
				x: Neum.RandomHelper(1, jaws.width),
				y: Neum.RandomHelper(1, jaws.height)
			};
			
			if(player != undefined){
				var rect = new jaws.Rect(position.x, position.y, spriteWidth, spriteHeight);
				if(jaws.collideRects(player.getSprite().rect(), rect)){
					position = { 
						x: Neum.RandomHelper(1, jaws.width),
						y: Neum.RandomHelper(1, jaws.height)
					};
				}
			}
			
			sprite = new jaws.Sprite({x: position.x, y: position.y, scale:scale });

			// Direction aléatoire			
			var direction = {
				x: (Neum.RandomHelper(1, 10) % 2) ? 1 : -1,
				y: (Neum.RandomHelper(50, 100) % 2) ? 1 : -1
			};

			var scale = Neum.RandomHelper(0.8, 2);



			// On switch sur les différents types de monstre
			switch (type) {
				case 1: 
					image = Neum.Constants.IMG_ANIM_LARDON;
					speed = Neum.Constants.ENEMY1_SPEED;
					
					animation = new jaws.Animation({
						sprite_sheet: image, frame_duration: 200, frame_size: [33, 32], orientation: "left"
					});
					
					sprite.animUp = animation.slice(0, 1);
					sprite.animDown = animation.slice(2, 3);
					sprite.animLeft = animation.slice(3, 4);
					sprite.animRight = animation.slice(1, 2);
					sprite.setImage(sprite.animDown.next());
					break;
				case 2: 
					image = Neum.Constants.IMG_ANIM_MACARON; 
					speed = Neum.Constants.ENEMY2_SPEED;
					animation = new jaws.Animation({
						sprite_sheet:image, frame_duration: 200, frame_size: [65, 64], orientation: "left"
					});
					
					sprite.animUp = animation.slice(1, 2);
					sprite.animDown = animation.slice(0, 1);
					sprite.animLeft = animation.slice(3, 4);
					sprite.animRight = animation.slice(2, 3);
					sprite.setImage(sprite.animDown.next());
					break;
				case 3: 
					image = Neum.Constants.IMG_ANIM_PAINEPICE; 
					speed = Neum.Constants.ENEMY3_SPEED;
					animation = new jaws.Animation({
						sprite_sheet:image, frame_duration: 200, frame_size: [65, 64], orientation: "left"
					});
					
					sprite.animUp = animation.slice(0, 1);
					sprite.animDown = animation.slice(2, 3);
					sprite.animLeft = animation.slice(3, 4);
					sprite.animRight = animation.slice(1, 2);
					sprite.setImage(sprite.animDown.next());
					break;
			}  

			sprite.direction = direction;
			sprite.type = type;
			sprite.speed = speed; 

			listEnemy.push(sprite);
		
		}

		this.update = function () {
			for (var i = 0, l = listEnemy.sprites.length; i < l; i++) { 
				var direction = listEnemy.sprites[i].direction;
				var type = listEnemy.sprites[i].type;
				var speed = listEnemy.sprites[i].speed;

				listEnemy.sprites[i].x += speed * direction.x;
				listEnemy.sprites[i].y += speed * direction.y;

				// Collisions avec les bords de l'écran
				if (listEnemy.sprites[i].x <= 0) {
					listEnemy.sprites[i].direction.x *= -1;
					listEnemy.sprites[i].setImage(listEnemy.sprites[i].animRight.next());
				}

				if (listEnemy.sprites[i].y < 0) {
					listEnemy.sprites[i].direction.y *= -1;
					listEnemy.sprites[i].setImage(listEnemy.sprites[i].animDown.next());
				}

				if (listEnemy.sprites[i].x + listEnemy.sprites[i].width > jaws.width) {
					listEnemy.sprites[i].direction.x *= -1;
					listEnemy.sprites[i].setImage(listEnemy.sprites[i].animLeft.next());
				}
				
				if (listEnemy.sprites[i].y + listEnemy.sprites[i].height > jaws.height) {
					listEnemy.sprites[i].direction.y *= -1;
					listEnemy.sprites[i].setImage(listEnemy.sprites[i].animUp.next());
				}
			}
		}

		this.checkCollideWithPlayer = function (player) {
			listEnemy.deleteIf(function (sprite) {
				if (jaws.collideOneWithOne(sprite, player.getSprite())) {
					player.freeze();
					return true;
				}
				return false;
			});	
		}

		this.checkCollideWithBullets = function (bullets) {
			listEnemy.deleteIf(function(sprite) {
				if (jaws.collideOneWithMany(sprite, bullets).length > 0) {
					Neum.Context.score++;
					return true;
				}
				return false;
			});
		}

		this.draw = function () {
			listEnemy.draw();
		}

		this.getList = function () { return listEnemy; }
	}
})();
