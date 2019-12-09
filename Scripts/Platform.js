	var platforms = [];
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
		for (var i = 0; i < platforms.length; i++) 
		{
			//Create the platform on canvas with collison box
			ctxG.rect(platforms[i].height, platforms[i].width, platforms[i].y, platforms[i].x);
			ctxG.drawImage(platforms[i].srcImg, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
			
			//Create the spikes for the platforms
			ctxG.rect(spikes[i].x, spikes[i].y, spikes[i].width/2, spikes[i].height);
			ctxG.drawImage(spikes[i].img, spikes[i].x, spikes[i].y, spikes[i].width, spikes[i].height);
		
			//If the score is 10 more than the previous score
			if(score > dScore + 10)
			{
				//Add 0.5 to the game speed
				n+=0.5;
				//Set the new previous score
				dScore = Math.floor(score);
				platforms[i].y += n;
				spikes[i].y += n;
			}
			else
			{
				//Move the platforms by n
				platforms[i].y += n;
				spikes[i].y += n;
			}

			//If the platforms y is off the window
			if(platforms[i].y > windowHeight)
			{
				//If the index is more than 0
				if(i > 0)
				{
					//If the index is even
					if(i == 2 || i == 4 || i == 6 || i == 8 || i == 10 || i == 12 || i == 14)
					{
						//Set the platforms y to be 250 above the previous
						platforms[i].y = platforms[i - 1].y - 250;

						//If the previous platforms x is on the right hand side of the canvas
						if(platforms[i-1].x > canvas.width / 2)
						{
							//Position the platform on the left hand side
							platforms[i].x = Math.floor(Math.random() * canvas.width / 2);
						}
						//If the previous platforms x is on the left hand side of the canvas
						else
						{
							//Position the platform on the right hand side
							platforms[i].x = Math.floor(Math.random() * canvas.width);
						}
					}
					else
					{
						//Set the platforms y to be the same as the previous
						platforms[i].y = platforms[i - 1].y;	

						//If the previous platforms x is on the right hand side of the canvas
						if(platforms[i - 1].x > canvas.width / 2)
						{
							//Position the platform on the left hand side
							platforms[i].x = platforms[i - 1].x - 500;
						}
						//If the previous platforms x is on the left hand side of the canvas
						else
						{
							//Position the platform on the right hand side
							platforms[i].x = platforms[i - 1].x + 500;
						}
					}
				}
				//If the index is equal to 0
				else
				{
					//Set the platforms y to be 250 above the previous
					platforms[i].y = platforms[platforms.length - 1].y - 250;
					
					//If the previous platforms x is on the right hand side of the canvas
					if(platforms[platforms.length - 1].x > canvas.width / 2)
					{
						//Position the platform on the left hand side
						platforms[i].x = platforms[platforms.length - 1].x - 500;
					}
					//If the previous platforms x is on the left hand side of the canvas
					else
					{
						//Position the platform on the right hand side
						platforms[i].x = platforms[platforms.length - 1].x + 500;
					}		
				}

				//Sets the location for the spike on the bottom of the platform
				spikes[i].x = Math.floor((Math.random() * (platforms[i].width - spikes[i].width)) + platforms[i].x);
				spikes[i].y = platforms[i].y + platforms[i].height;
			}
		}

		//Move the player by n
		player.y += n;
	}