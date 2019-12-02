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
		if(playerDir == "b")
		{  
			gravitySpeed = 0;
			player.velY = 0;
		}
		else if(playerDir == "t")
		{
			player.velY = player.velY/1.25;
		}
		else
		{
			if(playerY != player.y)
			{
				gravitySpeed += gravity;
			}
			else
			{	
				gravitySpeed = 0;
				player.velY = 0;
				
				if(player.y < windowHeight / 1.15)
				{
					gravitySpeed += gravity;
				}
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
