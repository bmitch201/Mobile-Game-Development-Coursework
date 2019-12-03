	var player;
	var friction = 0.8;
	var gravity = 0.98;
	var gravitySpeed = 0;
	var playerY = 0;
	var playerDir;
	var playerDeath = false;

	class Player { constructor(x, y, image, velX, velY, width, height){
		this.zindex = 0;
		this.x = x;
		this.y = y;
		this.velY = velY;
		this.velX = velX;
		this.srcImg = new Image();
		this.srcImg = image;
		this.width = width;
		this.height = height;
	}
	};
	
	function pUpdate() 
	{
		//If the player collison direction is bottom
		if(playerDir == "b")
		{  
			//Set gravity and player Y speed to 0
			gravitySpeed = 0;
			player.velY = 0;
		}
		//If the player collsion detection is top
		else if(playerDir == "t")
		{
			//Decrease player Y speed
			player.velY = player.velY/1.25;
		}
		//If neither
		else
		{
			//If player's y is not equal to the previous Y pos of player
			if(playerY != player.y)
			{
				//Increase gravity speed
				gravitySpeed += gravity;
			}
			//If player's y is equal to the previous Y pos of player
			else
			{	
				//Set gravity to 0
				gravitySpeed = 0;
				//Set player velcoity to 0
				player.velY = 0;
			}
		}

		playerY = player.y;

		player.velX *= friction;
		player.x += player.velX;

		if(player.y < windowHeight)
		{
			player.y += player.velY + gravitySpeed;
		}
		else
		{
			playerDeath = true;
		}

		ctxG.rect(player.x, player.y, player.width, player.height);
		ctxG.drawImage(player.srcImg, player.x, player.y, player.width, player.height);
	}
