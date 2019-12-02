var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

window.addEventListener("load", function () { Start(); Update(); });

document.body.addEventListener("keydown", function (e) { keys[e.keyCode] = true; isKeyPressed = true; });
document.body.addEventListener("keyup", function (e) { keys[e.keyCode] = false; isKeyPressed = false; });

var playerImg = new Image();
var crateImg = new Image();
var spikeImg = new Image();

var jumpAudio = new Audio();

var keys = [];
var states = []; 
var state;

var score = 0;
var highScore = 0;

var platform = {
	width : 350,
	height : 50,
	img : crateImg
};

function Start()	
{	
	playerImg.src = "Assets/Metal_Box.png"
	crateImg.src = 'Assets/wooden_deck.png';
	jumpAudio.src = "Assets/Jump.mp3";
	buttonAudio.src = 'Assets/Click.mp3';
	backgroundAudio.src = "Assets/Background.mp3";
	left.src = 'Assets/Button_Arrow_Left.png';
	right.src = 'Assets/Button_Arrow_Right.png';
	up.src = 'Assets/Button_Arrow_Up.png';
	
	GameSetup();

	states.push("Menu");
	states.push("Play");
	states.push("Pause");
	states.push("GameOver");	

	state = states[0];

	if(document.cookie != null)
	{
		highScore = getCookie("Highscore")
		console.log(highScore);
	}

	mStart();
}

function getCookie(cookieName) 
{
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieEnd = decodedCookie.split(';');
  
  for(var i = 0; i <cookieEnd.length; i++) 
  {
    var cookie = cookieEnd[i];
    
    while (cookie.charAt(0) == ' ') 
    {
      cookie = cookie.substring(1);
    }
    
    if (cookie.indexOf(name) == 0) 
    {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return "";
}

function GameSetup()
{
	boxes.push(new Crate(Math.random() * (canvas.width - 500), 800, platform.width, platform.height, platform.img));
	if(boxes[0].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[0].x - 500, 800, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[0].x + 500, 800, platform.width, platform.height, platform.img));
	}	

	boxes.push(new Crate(Math.random() * (canvas.width - 500), 550, platform.width, platform.height, platform.img));
	if(boxes[2].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[2].x - 500, 550, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[2].x + 500, 550, platform.width, platform.height, platform.img));
	}

	boxes.push(new Crate(Math.random() * (canvas.width - 500), 300, platform.width, platform.height, platform.img));
	if(boxes[4].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[4].x - 500, 300, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[4].x + 500, 300, platform.width, platform.height, platform.img));
	}

	boxes.push(new Crate(Math.random() * (canvas.width - 500), 50, platform.width, platform.height, platform.img));
	if(boxes[6].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[6].x - 500, 50, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[6].x + 500, 50, platform.width, platform.height, platform.img));
	}

	boxes.push(new Crate(Math.random() * (canvas.width - 500), -200, platform.width, platform.height, platform.img));
	if(boxes[8].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[8].x - 500, -200, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[8].x + 500, -200, platform.width, platform.height, platform.img));
	}

	boxes.push(new Crate(Math.random() * (canvas.width - 500), -450, platform.width, platform.height, platform.img));
	if(boxes[10].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[10].x - 500, -450, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[10].x + 500, 5-450, platform.width, platform.height, platform.img));
	}

	boxes.push(new Crate(Math.random() * (canvas.width - 500), -700, platform.width, platform.height, platform.img));
	if(boxes[12].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[12].x - 500, -700, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[12].x + 500, -700, platform.width, platform.height, platform.img));
	}

	boxes.push(new Crate(Math.random() * (canvas.width - 500), -950, platform.width, platform.height, platform.img));
	if(boxes[14].x > canvas.width / 2)
	{
		boxes.push(new Crate(boxes[14].x - 500, -950, platform.width, platform.height, platform.img));
	}
	else
	{
		boxes.push(new Crate(boxes[14].x + 500, -950, platform.width, platform.height, platform.img));
	}

	player = new Player(boxes[2].x + 30, boxes[2].y - 200, playerImg, 0 , 0, 100, 100);
}

function Update()
{
	if(state == "Play")
	{
		ctxG.clearRect(0, 0, windowWidth, windowHeight);

		for (var i = 0; i < boxes.length; i++) 
		{
			var col;
			// check if crate collide with players
			col = colCheck(player, boxes[i]);

			if(playerDir != col)
			{
				playerDir = col;
				break;
			}
		}
		
		vUpdate();
		cUpdate();
		pUpdate();

		canvasM.addEventListener("click", function (event) 
		{
			if(event.y < windowHeight / 2)
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

 		if (keys[32])
		{
			// space
			if(playerDir == null)
			{
				if(player.y == playerY)
				{		
					jumpAudio.play();
					player.velY = -23;
					player.y += player.velY;
				}
			}
			else if (playerDir == "b")
			{
				jumpAudio.play();
				player.velY = -23;
				player.y += player.velY;
			}
		}
		
		if (keys[39]) {
			// right arrow
			if(player.x<(canvas.width-player.width-25))
				player.velX++;
		}
		else if (keys[37]) {
			// left arrow
			if(player.x>player.width - 80)
				player.velX--;
		}
		else if (keys[80]) {
			state = states[2];
			mPause();
		}

		score += 0.02;

		ctxG.font = "20px Arial";
		ctxG.fillStyle = "black";
		ctxG.textAlign = "right";
		ctxG.fillText("Score: " + Math.floor(score), 100, 30);

		if(playerDeath)
		{
			if(score > highScore)
			{
				highScore = Math.floor(score);
				newHS = true;
				document.cookie = "Highscore = " + highScore;
				console.log(document.cookie);
			}

			playerDeath = false;
			state = states[3];
			mGameOver();
		}

		backgroundAudio.addEventListener('ended', function() { 
			this.currentTime = 0; 
			this.play();
		}, false);
	}
	else if(state == "Menu" || state == "Pause")
	{
		backgroundAudio.pause();
		mUpdate();
	}
	else if(state == "GameOver")
	{
		backgroundAudio.pause();
		mUpdate();
	}

	requestAnimationFrame(Update);
}

function colCheck(shapeA, shapeB) {
	
	// get the vectors to check against
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),	vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
	// add the half widths and half heights of the objects
			hWidths = (shapeA.width / 2) + (shapeB.width / 2), hHeights = (shapeA.height / 2) + (shapeB.height / 2), colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) 
	{	
		// figures out on which side we are colliding (top, bottom, left, or right)
		var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
		
		if (oX >= oY) 
		{
			if (vY > 0) 
			{
				colDir = "t";
				shapeA.y += oY;
			} 
			else
			{
				colDir = "b";
				shapeA.y -= oY;
			}
		} 
		else if (oX < oY)
		{
			if (vX > 0) 
			{
				colDir = "l";
				shapeA.x += oX;
			} 
			else 
			{
				colDir = "r";
				shapeA.x -= oX;		
			}
		}
		else
		{
			colDir = null;
		}

		return colDir;
	}
}	