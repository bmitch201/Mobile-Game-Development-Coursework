var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var backgroundAudio = new Audio();

var title;
var newHS = false;

var buttonAudio = new Audio();
var backgroundImg = new Image();
backgroundImg.src = "Assets/Background.png";

var startBtn = {
	x : windowWidth/2 - 50,
	y : windowHeight/2 - 25,
	width : 100,
	height : 50
};

function mStart()
{
	ctxM.drawImage(backgroundImg, 0, 0, windowWidth, windowHeight);

	//Sets up the text to be displayed to the player
	ctxM.font = "50px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Jumpy Box", windowWidth / 2, 50);

	ctxM.font = "30px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Movement - Left Arrow Key, Move Left", windowWidth / 2, windowHeight / 1.5);

	ctxM.font = "30px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Right Arrow Key, Move Right", windowWidth / 2, windowHeight / 1.5 + 50);

	ctxM.font = "30px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Space Key, Jump", windowWidth / 2, windowHeight / 1.5 + 100);
	
	//Draw the button on the screen
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "white";
	ctxM.fillRect(startBtn.x, startBtn.y, startBtn.width, startBtn.height);	

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Start", startBtn.x + startBtn.width / 2, startBtn.y +  startBtn.height / 2 + 5);	

}

function mUpdate()
{
	//Adds an event listener to check if the player clicks a button
	canvasM.addEventListener("click", function (event) 
	{ 
		//If the user is on the menu scene and it is the start button
		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y && event.y < startBtn.y + startBtn.height && state == "Menu")
		{ 
			//Play the button audio, clear the menu context, game state equals play, play the background audio (and set it to the start)
			buttonAudio.play();
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[1]; 
			backgroundAudio.currentTime = 0;
			backgroundAudio.play();
		} 

		//If the user is on the pause scene and it is the resume button
		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y && event.y < startBtn.y + startBtn.height && state == "Pause")
		{ 
			//Play the button audio, clear the menu context, game state equals play, resume the background audio
			buttonAudio.play();
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[1]; 
			backgroundAudio.play();
		} 

		//If the user is on the Game Over scene and it is the retry button
		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y + 100 && event.y < (startBtn.y + 100) + startBtn.height && state == "GameOver")
		{ 
			//Play the button audio, clear the menu context, game state equals play, clear the game context, reset all the game elements, Call game setup function, reset and play the background audio
			buttonAudio.play();
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[1];
			ctxG.clearRect(0, 0, windowWidth, windowHeight);
			boxes.length = 0;
			spikes.length = 0;
			player = 0;
			score = 0;
			n = 1;
			dScore = 0;
			GameSetup();
			backgroundAudio.currentTime = 0;
			backgroundAudio.play();
		} 

		//If the user is on the game over scene and it is the menu button
		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y + 200 && event.y < (startBtn.y + 200) + startBtn.height && state == "GameOver")
		{ 
			//Play the button audio, clear the menu context, game state equals menu, clear the game context, reset all the game elements, Call game setup function, Call the menu function
			buttonAudio.play();
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[0];
			ctxG.clearRect(0, 0, windowWidth, windowHeight);
			boxes.length = 0;
			spikes.length = 0;
			player = 0;
			score = 0;
			n = 1;
			dScore = 0;
			GameSetup();
			mStart();
		} 
	} );
}

function mPause()
{
	//Create a transparent black plane 
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctxM.fillRect(0, 0, windowWidth, windowHeight)

	//Set up the text for the pause menu
	ctxM.font = "50px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Pause", windowWidth / 2, 50);

	//Display the users high score
	ctxM.font = "50px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("High Score: " + Math.floor(highScore), windowWidth / 2, windowHeight / 2 - 50);	
	
	//Create the resume button
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "white";
	ctxM.fillRect(startBtn.x, startBtn.y, startBtn.width, startBtn.height);

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Resume", startBtn.x + startBtn.width / 2, startBtn.y +  startBtn.height / 2 + 5);
}

function mGameOver()
{
	//Create a transparent black plane
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctxM.fillRect(0, 0, windowWidth, windowHeight)

	//Set up the text for the game over scene
	ctxM.font = "50px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Game Over", windowWidth / 2, 50);

	//Display the users final score
	ctxM.font = "50px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Score: " + Math.floor(score), windowWidth / 2, windowHeight / 2 - 20);

	//If the user has gained a new highscore
	if(newHS)
	{
		//Display text to tell them
		ctxM.font = "50px Arial";
		ctxM.fillStyle = "red";
		ctxM.textAlign = "center";
		ctxM.fillText("New High Score!", windowWidth / 2, windowHeight / 2 + 30);
		newHS = false;
	}

	//Create the retry button
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "white";
	ctxM.fillRect(startBtn.x, startBtn.y + 100, startBtn.width, startBtn.height);

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Retry", startBtn.x + startBtn.width / 2, (startBtn.y + 100) +  startBtn.height / 2 + 5);

	//Create the menu button 
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "white";
	ctxM.fillRect(startBtn.x, startBtn.y + 200, startBtn.width, startBtn.height);

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Menu", startBtn.x + startBtn.width / 2, (startBtn.y + 200) +  startBtn.height / 2 + 5);
}