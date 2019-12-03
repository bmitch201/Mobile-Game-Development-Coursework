	var boxes = [];
	var dScore = 0;
	var n = 1;

	class Crate { constructor(x, y, width, height, crateImg)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.srcImg = new Image();
		this.srcImg = crateImg;
	}};

	function cUpdate()
	{
		//Clear the game context
		ctxG.clearRect(0, 0, windowWidth, windowHeight);

		//For each platform
		for (var i = 0; i < boxes.length; i++) 
		{
			//Create the platform on canvas with collison box
			ctxG.rect(boxes[i].height, boxes[i].width, boxes[i].y, boxes[i].x);
			ctxG.drawImage(boxes[i].srcImg, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
			
			//If the players collison direction is left or right
			if (playerDir === "l" || playerDir === "r") 
			{
				//Don't allow them character to move inside the collided object
				player.velX = 0;
			} 
			//Else if the players collsion direction is top or bottom
			else if(playerDir === "t" || playerDir === "b")
			{
				//Don't allow them character to move inside the collided object
				player.velY = 0;
			}
		
			//If the score is 10 more than the previous score
			if(score > dScore + 10)
			{
				//Add 0.5 to the game speed
				n+=0.5;
				//Set the new previous score
				dScore = Math.floor(score);
				boxes[i].y += n;
			}
			else
			{
				//Move the boxes by n
				boxes[i].y += n;
			}

			//
			if(boxes[i].y > windowHeight)
			{
				if(i > 0)
				{
					if(i == 2 || i == 4 || i == 6 || i == 8 || i == 10 || i == 12 || i == 14)
					{
						boxes[i].y = boxes[i - 1].y - 250;

						if(boxes[i-1].x > canvas.width / 2)
						{
							boxes[i].x = Math.floor(Math.random() * canvas.width / 2);
						}
						else
						{
							boxes[i].x = Math.floor(Math.random() * canvas.width);
						}
					}
					else
					{
						boxes[i].y = boxes[i - 1].y;	

						if(boxes[i - 1].x > canvas.width / 2)
						{
							boxes[i].x = boxes[i - 1].x - 500;
						}
						else
						{
							boxes[i].x = boxes[i - 1].x + 500;
						}
					}
				}
				else
				{
					boxes[i].y = boxes[boxes.length - 1].y - 250;
					boxes[i].x = Math.random() * canvas.width - 350;
				}
			}
		}

		player.y += n;	
	
	}