	var boxes = [];

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
		ctxG.clearRect(0, 0, windowWidth, windowHeight);

		for (var i = 0; i < boxes.length; i++) 
		{
			// show the boxes on canvas
			ctxG.rect(boxes[i].height, boxes[i].width, boxes[i].y, boxes[i].x);
			ctxG.drawImage(boxes[i].srcImg, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
			
			if (playerDir === "l" || playerDir === "r") 
			{
				player.velX = 0;
			} 
			else if(playerDir === "t" || playerDir === "b")
			{
				player.velY = 0;
			}

			boxes[i].y++;

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

		player.y++;			
	}