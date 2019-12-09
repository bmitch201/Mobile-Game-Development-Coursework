	var canvasM = document.getElementById("canvasMenu");
	var canvas = document.getElementById("canvasForTheGame");
	var canvasB = document.getElementById("canvasBackground");

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	var ctxM = canvasM.getContext("2d");
	var ctxG = canvas.getContext("2d");
	var ctxB = canvasB.getContext("2d");

	var backgroundImg = new Image();
	backgroundImg.src = "Assets/Background.png";

	canvas.width = windowWidth;
	canvas.height = windowHeight;

	canvasM.width = windowWidth;
	canvasM.height = windowHeight;

	canvasB.width = windowWidth;
	canvasB.height = windowHeight;