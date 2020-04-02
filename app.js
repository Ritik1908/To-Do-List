const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

// Telling app to use ejs as viewing engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extends: true}));

app.use(express.static("public"))

let newItem = ["a", "v", "c"];
let workItem = [];

app.get("/", function(req, res){
	day = date.getDate();
	res.render("list", {listName: day, newListItems: newItem});
});

app.post("/", function(req, res){
	let Item = req.body.newItem;
	if(req.body.listName == "Work List") {
		workItem.push(Item);
		res.redirect("/work");
	} else {
		newItem.push(Item);
		res.redirect("/");
	}
});

app.get("/work", function(req, res) {
	res.render("list", {listName: "Work List", newListItems: workItem});
});

app.listen(3000, function() {
	console.log("Server Successfully Created");
});
