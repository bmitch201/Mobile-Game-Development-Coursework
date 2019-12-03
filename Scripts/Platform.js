	var boxes = [];
	var spikes = [];
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
		//For each platform
		for (var i = 0; i < boxes.length; i++) 
		{
			//Create the platform on canvas with collison box
			ctxG.rect(boxes[i].height, boxes[i].width, boxes[i].y, boxes[i].x);
			ctxG.drawImage(boxes[i].srcImg, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
			ctxG.rect(spikes[i].x, spikes[i].y, spikes[i].width, spikes[i].height);
			ctxG.drawImage(spikes[i].img, spikes[i].x, spikes[i].y, spikes[i].width, spikes[i].height);

			//If the players collison direction is left or right
			if (playerDir === "l" || playerDir === "r") 
			{
				//Don't allow them character to move inside the collided object
				player.velX = 0;
			}
		
			//If the score is 10 more than the previous score
			if(score > dScore + 10)
			{
				//Add 0.5 to the game speed
				n+=0.5;
				//Set the new previous score
				dScore = Math.floor(score);
				boxes[i].y += n;
				spikes[i].y += n;
			}
			else
			{
				//Move the boxes by n
				boxes[i].y += n;
				spikes[i].y += n;
			}

			//If the platforms y is off the window
			if(boxes[i].y > windowHeight)
			{
				//If the index is more than 0
				if(i > 0)
				{
					//If the index is even
					if(i == 2 || i == 4 || i == 6 || i == 8 || i == 10 || i == 12 || i == 14)
					{
						//Set the platforms y to be 250 above the previous
						boxes[i].y = boxes[i - 1].y - 250;

						//If the previous platforms x is on the right hand side of the canvas
						if(boxes[i-1].x > canvas.width / 2)
						{
							//Position the platform on the left hand side
							boxes[i].x = Math.floor(Math.random() * canvas.width / 2);
						}
						//If the previous platforms x is on the left hand side of the canvas
						else
						{
							//Position the platform on the right hand side
							boxes[i].x = Math.floor(Math.random() * canvas.width);
						}

						spikes[i].x = Math.floor((Math.random() * boxes[i].width) + boxes[i].x - spikes[i].x);
						spikes[i].y = boxes[i].y - boxes[i].height;
					}
					else
					{
						//Set the platforms y to be the same as the previous
						boxes[i].y = boxes[i - 1].y;	

						//If the previous platforms x is on the right hand side of the canvas
						if(boxes[i - 1].x > canvas.width / 2)
						{
							//Position the platform on the left hand side
							boxes[i].x = boxes[i - 1].x - 500;
						}
						//If the previous platforms x is on the left hand side of the canvas
						else
						{
							//Position the platform on the right hand side
							boxes[i].x = boxes[i - 1].x + 500;
						}

						spikes[i].x = Math.floor((Math.random() * boxes[i].width) + boxes[i].x - spikes[i].x);
						spikes[i].y = boxes[i].y - boxes[i].height;
					}
				}
				//If the index is equal to 0
				else
				{
					//Set the platforms y to be 250 above the previous
					boxes[i].y = boxes[boxes.length - 1].y - 250;
					
					//If the previous platforms x is on the right hand side of the canvas
					if(boxes[boxes.length - 1].x > canvas.width / 2)
					{
						//Position the platform on the left hand side
						boxes[i].x = boxes[boxes.length - 1].x - 500;
					}
					//If the previous platforms x is on the left hand side of the canvas
					else
					{
						//Position the platform on the right hand side
						boxes[i].x = boxes[boxes.length - 1].x + 500;
					}

					spikes[i].x = Math.floor((Math.random() * boxes[i].width) + boxes[i].x - spikes[i].x);
					spikes[i].y = boxes[i].y - boxes[i].height;
				}
			}
		}

		//Move the player by n
		player.y += n;
	}