var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var backgroundAudio = new Audio();

var title;
var newHS = false;

var buttonAudio = new Audio();

var startBtn = {
	x : windowWidth/2 - 50,
	y : windowHeight/2 - 25,
	width : 100,
	height : 50
};

function mStart()
{
	ctxM.font = "50px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Title", windowWidth / 2, 50);

	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "black";
	ctxM.fillRect(startBtn.x, startBtn.y, startBtn.width, startBtn.height);

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Start", startBtn.x + startBtn.width / 2, startBtn.y +  startBtn.height / 2 + 5);

	ctxM.font = "30px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Movement - Left Arrow Key, Move Left", windowWidth / 2, windowHeight / 1.5);

	ctxM.font = "30px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Right Arrow Key, Move Right", windowWidth / 2, windowHeight / 1.5 + 50);

	ctxM.font = "30px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Space Key, Jump", windowWidth / 2, windowHeight / 1.5 + 100);
}

function mUpdate()
{
	canvasM.addEventListener("click", function (event) 
	{ 
		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y && event.y < startBtn.y + startBtn.height && state == "Menu")
		{ 
			buttonAudio.play();
			console.log("Start clicked"); 
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[1]; 
			backgroundAudio.currentTime = 0;
			backgroundAudio.play();
		} 

		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y && event.y < startBtn.y + startBtn.height && state == "Pause")
		{ 
			buttonAudio.play();
			console.log("Resume clicked"); 
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[1]; 
			backgroundAudio.play();
		} 

		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y + 100 && event.y < (startBtn.y + 100) + startBtn.height && state == "GameOver")
		{ 
			buttonAudio.play();
			console.log("Retry clicked"); 
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[1];
			ctxG.clearRect(0, 0, windowWidth, windowHeight);
			boxes.length = 0;
			player = 0;
			score = 0;
			GameSetup();
			backgroundAudio.currentTime = 0;
			backgroundAudio.play();
		} 

		if ( event.x > startBtn.x && event.x < startBtn.x + startBtn.width && event.y > startBtn.y + 200 && event.y < (startBtn.y + 200) + startBtn.height && state == "GameOver")
		{ 
			buttonAudio.play();
			console.log("Menu clicked"); 
			ctxM.clearRect(0, 0, windowWidth, windowHeight); 
			state = states[0];
			ctxG.clearRect(0, 0, windowWidth, windowHeight);
			boxes.length = 0;
			player = 0;
			score = 0;
			GameSetup();
			mStart();
		} 
	} );
}

function mPause()
{
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctxM.fillRect(0, 0, windowWidth, windowHeight)

	ctxM.font = "50px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Pause", windowWidth / 2, 50);

	ctxM.font = "50px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("High Score: " + Math.floor(highScore), windowWidth / 2, windowHeight / 2 - 50);

	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "black";
	ctxM.fillRect(startBtn.x, startBtn.y, startBtn.width, startBtn.height);

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Resume", startBtn.x + startBtn.width / 2, startBtn.y +  startBtn.height / 2 + 5);
}

function mGameOver()
{
	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctxM.fillRect(0, 0, windowWidth, windowHeight)

	ctxM.font = "50px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Game Over", windowWidth / 2, 50);

	ctxM.font = "50px Arial";
	ctxM.fillStyle = "black";
	ctxM.textAlign = "center";
	ctxM.fillText("Score: " + Math.floor(score), windowWidth / 2, windowHeight / 2 - 20);

	if(newHS)
	{
			ctxM.font = "50px Arial";
			ctxM.fillStyle = "red";
			ctxM.textAlign = "center";
			ctxM.fillText("New High Score!", windowWidth / 2, windowHeight / 2 + 30);
			newHS = false;
	}

	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "black";
	ctxM.fillRect(startBtn.x, startBtn.y + 100, startBtn.width, startBtn.height);

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Retry", startBtn.x + startBtn.width / 2, (startBtn.y + 100) +  startBtn.height / 2 + 5);

	ctxM.beginPath();
	ctxM.fill();
	ctxM.fillStyle = "black";
	ctxM.fillRect(startBtn.x, startBtn.y + 200, startBtn.width, startBtn.height);

	ctxM.font = "20px Arial";
	ctxM.fillStyle = "white";
	ctxM.textAlign = "center";
	ctxM.fillText("Menu", startBtn.x + startBtn.width / 2, (startBtn.y + 200) +  startBtn.height / 2 + 5);
}