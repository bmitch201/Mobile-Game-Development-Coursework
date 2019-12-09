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
var localStorageName = "localStorage";

var platform = {
	width : 350,
	height : 50,
	img : crateImg
};

var bckg1 = {
	width: windowWidth,
	height: windowHeight,
	x: 0,
	y: 0,
	img: backgroundImg
};

var bckg2 = {
	width: windowWidth,
	height: windowHeight,
	x: 0,
	y: -windowHeight,
	img: backgroundImg
};

class Spike { constructor(x, y, width, height, spikeImg)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.img = spikeImg;
}};

function Start()	
{	
	ctxB.drawImage(backgroundImg, 0, 0, windowWidth, windowHeight);

	//Find the sources for the assets
	playerImg.src = "Assets/Metal_Box.png"
	crateImg.src = 'Assets/wooden_deck.png';	
	spikeImg.src = "Assets/Spike.png";
	jumpAudio.src = 'Assets/Jump.mp3';
	buttonAudio.src = "Assets/Click.mp3";
	backgroundAudio.src = 'Assets/Background.mp3';

	//Setup the game
	GameSetup();

	//Setup the states 
	states.push("Menu");
	states.push("Play");
	states.push("Pause");
	states.push("GameOver");	

	//Set the state to the main menu
	state = states[0];

	highScore = localStorage.getItem(localStorageName) == null ? 0 : localStorage.getItem(localStorageName);

	//Call the start function for the main menu
	mStart();
}

function GameSetup()
{
	//Setup the platforms to be used in the game
	platforms.push(new Crate(Math.random() * (canvas.width - 500), 800, platform.width, platform.height, platform.img));
	//If the previous box is on the left side of the canvas then spawn the platform on the right
	if(platforms[0].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[0].x - 500, 800, platform.width, platform.height, platform.img));
	}
	//Else if the canvas is on the right side then spawn the platform on the left
	else
	{
		platforms.push(new Crate(platforms[0].x + 500, 800, platform.width, platform.height, platform.img));
	}	

	platforms.push(new Crate(Math.random() * (canvas.width - 500), 550, platform.width, platform.height, platform.img));
	if(platforms[2].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[2].x - 500, 550, platform.width, platform.height, platform.img));
	}
	else
	{
		platforms.push(new Crate(platforms[2].x + 500, 550, platform.width, platform.height, platform.img));
	}

	platforms.push(new Crate(Math.random() * (canvas.width - 500), 300, platform.width, platform.height, platform.img));
	if(platforms[4].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[4].x - 500, 300, platform.width, platform.height, platform.img));
	}
	else
	{
		platforms.push(new Crate(platforms[4].x + 500, 300, platform.width, platform.height, platform.img));
	}

	platforms.push(new Crate(Math.random() * (canvas.width - 500), 50, platform.width, platform.height, platform.img));
	if(platforms[6].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[6].x - 500, 50, platform.width, platform.height, platform.img));
	}
	else
	{
		platforms.push(new Crate(platforms[6].x + 500, 50, platform.width, platform.height, platform.img));
	}

	platforms.push(new Crate(Math.random() * (canvas.width - 500), -200, platform.width, platform.height, platform.img));
	if(platforms[8].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[8].x - 500, -200, platform.width, platform.height, platform.img));
	}
	else
	{
		platforms.push(new Crate(platforms[8].x + 500, -200, platform.width, platform.height, platform.img));
	}

	platforms.push(new Crate(Math.random() * (canvas.width - 500), -450, platform.width, platform.height, platform.img));
	if(platforms[10].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[10].x - 500, -450, platform.width, platform.height, platform.img));
	}
	else
	{
		platforms.push(new Crate(platforms[10].x + 500, 5-450, platform.width, platform.height, platform.img));
	}

	platforms.push(new Crate(Math.random() * (canvas.width - 500), -700, platform.width, platform.height, platform.img));
	if(platforms[12].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[12].x - 500, -700, platform.width, platform.height, platform.img));
	}
	else
	{
		platforms.push(new Crate(platforms[12].x + 500, -700, platform.width, platform.height, platform.img));
	}

	platforms.push(new Crate(Math.random() * (canvas.width - 500), -950, platform.width, platform.height, platform.img));
	if(platforms[14].x > canvas.width / 2)
	{
		platforms.push(new Crate(platforms[14].x - 500, -950, platform.width, platform.height, platform.img));
	}
	else
	{
		platforms.push(new Crate(platforms[14].x + 500, -950, platform.width, platform.height, platform.img));
	}

	//For each platform create a spike
	for(var i = 0; i < platforms.length; i++)
	{
		spikes.push(new Spike(-100, -100, 40, 50, spikeImg));
	}

	//Set up the player character
	player = new Player(platforms[2].x + 30, platforms[2].y - 200, playerImg, 0 , 0, 100, 100);
}

function Update()
{
	
	//If the state is play
	if(state == "Play")
	{
		//Clear the game context
		ctxG.clearRect(0, 0, windowWidth, windowHeight);

		if(bckg1.y > windowHeight)
		{
			bckg1.y = -windowHeight;
		}
		else if (bckg2.y > windowHeight)
		{
			bckg2.y = -windowHeight;
		}

		bckg1.y++;
		bckg2.y++;

		ctxG.drawImage(bckg1.img, bckg1.x, bckg1.y, bckg1.width, bckg1.height + 10);
		ctxG.drawImage(bckg2.img, bckg2.x, bckg2.y, bckg2.width, bckg2.height + 10);

		//For each platform check if there are any collisons
		for (var i = 0; i < platforms.length; i++) 
		{
			var col;
			var type = "box";
			//Check if player collides with platform
			col = colCheck(player, platforms[i], type);

			//Set the player collison direction
			if(playerDir != col)
			{
				playerDir = col;
				break;
			}
		}

		//For each platform check if there are any collisons
		for (var i = 0; i < spikes.length; i++) 
		{
			var type = "spike";
			//Check if player collides with platform
			colCheck(player, spikes[i], type);
		}
		
		//Calls the platform update
		cUpdate();
		//Calls the player update
		pUpdate();

		//Add an event to check if the user has clicked on the top half of teh screen in order to allow the character to jump
		canvasM.addEventListener("click", function (event) 
		{
			//If the player clicks on the top half of the screen
			if(event.y < windowHeight / 2)
			{
				if (playerDir == "b")
				{
					//Set the players velocity to 0
					player.velY = 0;

					//Play the jump audio
					jumpAudio.play();
					//Set the characters velocity allowing them to jump
					player.velY-=23;
				}
			}
		});

		//If the key pressed is space
 		if (keys[32])
		{
			//If the player collision is equal to null
			if(playerDir == null)
			{
				//If the character's y is the same as previous y
				if(player.y == playerY)
				{		
					//Play the jump audio
					jumpAudio.play();
					//Set the characters velocity allowing them to jump
					player.velY = -23;
					//Add the velocity to the characters position
					player.y += player.velY;
				}
			}
			//If the player is on top of the platform
			else if (playerDir == "b")
			{
				//Play the jump audio
				jumpAudio.play();
				//Set the characters velocity allowing them to jump
				player.velY = -23;
				//Add the velocity to the characters position
				player.y += player.velY;
			}
		}
		
		//If the right arrow is pressed
		if (keys[39]) {
			//If the character is not at the right edge of the screen
			if(player.x<(canvas.width-player.width-25))
				//Move the character
				player.velX++;
		}
		//If the left arrow is pressed
		else if (keys[37]) {
			//If the character is not at the left edge of the screen
			if(player.x>player.width - 80)
				//Move teh character
				player.velX--;
		}
		//If the player hits the "P" key
		else if (keys[80]) {
			//Switch the state to P
			state = states[2];
			//Call the pause function
			mPause();
		}

		//Add to the score
		score += 0.02;

		//Set the font, color and alignment for text to display the score
		ctxG.font = "20px Arial";
		ctxG.fillStyle = "white";
		ctxG.textAlign = "right";
		ctxG.fillText("Score: " + Math.floor(score), 100, 30);

		//If the character dies
		if(playerDeath)
		{
			//If the score is more than the highscore
			if(score > highScore)
			{
				//Save the score as the highscore
				highScore = Math.floor(score);
				//Saves the highscore with local storage
				localStorage.setItem(localStorageName, highScore);
				newHS = true;
			}

			playerDeath = false;
			//Set the game state to Game Over
			state = states[3];
			//Call the game over function
			mGameOver();
		}

		//If the background audio ends then restart it
		backgroundAudio.addEventListener('ended', function() { this.currentTime = 0; this.play();}, false);
	}
	//If the game state is Menu or Pause or Game Over
	else if(state == "Menu" || state == "Pause" || state == "GameOver")
	{
		//Pause the background audio
		backgroundAudio.pause();
		//Call the menu update function
		mUpdate();
	}

	//Call Update again
	requestAnimationFrame(Update);
}

//Function to check for collisons
function colCheck(shapeA, shapeB, type) {
	
	//Get the vectors to check against
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),	vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
	//Add the half widths and half heights of the objects
			hWidths = (shapeA.width / 2) + (shapeB.width / 2), hHeights = (shapeA.height / 2) + (shapeB.height / 2), colDir = null;

	//If the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) 
	{	
		//Which side we are colliding (top, bottom, left, or right)
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

		if(type == "box")
		{
			//Return the collsion type
			return colDir;
		}
		else if (type == "spike")
		{
			playerDeath = true;
			return;
		}
	}
}	