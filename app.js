const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Telling app to use ejs as viewing engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extends: true}));

app.get("/", function(req, res){
	var today = new Date();
	var currentDay = today.getDay();
	var day = "";
	switch(currentDay) {
		case 0 :
			day = "Sunday";
			break;
		case 1 :
			day = "Monday";
			break;
		case 2:
			day = "Tuesday";
			break;
		case 3 :
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5 :
			day = "Friday";
			break;
		case 6:
			day = "Saturday";
			break;
		default:
		 	console.log("Error"+currentDay);
	}
	// if(currentDay == 6 || currentDay == 0) {
	// 	day = "Weekend";
	// }
	// else {
	// 	day = "Weekday";
		// res.write("<h1>Working Day</h1>");
		// res.write("<p>It is not weekend.</p>");
		// res.sendFile(__dirname+"/index.html");
	// }
	res.render("list", {dayOfWeek: day});
});

app.listen(3000, function() {
	console.log("Server Successfully Created");
});

