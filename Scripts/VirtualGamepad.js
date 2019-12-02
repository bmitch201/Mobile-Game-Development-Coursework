
var arrowButton = {
	x : windowWidth - 125,
	y : windowHeight - 125,
	width : 100,
	height : 100,
};

var up = new Image();
var left = new Image();
var right = new Image();

function vUpdate()
{
	ctxM.clearRect(0, 0, windowWidth, windowHeight);

	ctxM.drawImage(left, arrowButton.x, arrowButton.y, arrowButton.width, arrowButton.height);
	ctxM.drawImage(right, arrowButton.x - 200, arrowButton.y, arrowButton.width, arrowButton.height);
	ctxM.drawImage(up, arrowButton.x - 100, arrowButton.y, arrowButton.width, arrowButton.height);

	canvasM.addEventListener("click", function (event) 
	{
		if(event.x > windowHeight/2)
		{
			player.velY = 0;

			if(playerDir == null)
			{
				if(player.y == playerY)
				{		
					jumpAudio.play();
					player.velY-=23;
				}
			}
			else if (playerDir == "b")
			{
				jumpAudio.play();
				player.velY-=23;
			}
		}
	});

	canvasM.addEventListener("mouseover", function (event) 
	{ 
		console.log("mouseover");

		if ( event.x > arrowButton.x && event.x < arrowButton.x + arrowButton.width && event.y > arrowButton.y && event.y < arrowButton.y + arrowButton.height)
		{ 
			player.velX = 0;

			if(player.x<(canvas.width-player.width-25))
			{
				player.velX+=1;
			}
		}

		if (event.x > arrowButton.x - 100 && event.x < arrowButton.x - 100 + arrowButton.width && event.y > arrowButton.y && event.y < arrowButton.y + arrowButton.height )
		{ 
			player.velY = 0;

			if(playerDir == null)
			{
				if(player.y == playerY)
				{		
					jumpAudio.play();
					player.velY-=23;
				}
			}
			else if (playerDir == "b")
			{
				jumpAudio.play();
				player.velY-=23;
			}
		}

		if ( event.x > arrowButton.x - 200 && event.x < arrowButton.x - 200 + arrowButton.width && event.y > arrowButton.y && event.y < arrowButton.y + arrowButton.height)
		{ 
			player.velX = 0;

			if(player.x>(player.width - 80))
			{
				player.velX-=1;
			}
		}
	} );
}