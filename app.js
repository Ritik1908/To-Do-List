const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extends: true}));

app.get("/", function(req, res){
	var today = new Date();
	var currentDay = today.getDay();
	if(currentDay == 6 || currentDay == 0) {
		res.send("<h1>Today is sunday.</h1>");
	}
	else {
		// res.write("<h1>Working Day</h1>");
		// res.write("<p>It is not weekend.</p>");
		res.sendFile(__dirname+"/index.html");
	}
});

app.listen(3000, function() {
	console.log("Server Successfully Created");
});

