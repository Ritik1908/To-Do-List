const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

// Telling app to use ejs as viewing engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extends: true}));

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = {
	name: {
		type: String
	}
}

const Item = mongoose.model("Item", itemSchema);

const work1 = new Item({
	name: "Welcome to your todolist"
});

const work2 = new Item({
	name: "Hit + button to add new item."
});

const work3 = new Item({
	name: "<-- Hit this to delete a item."
});

const defaultItems = [work1, work2, work3];

// Item.insertMany(defaultItems, function(err) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("Successfully Added");
// 	}
// })

app.get("/", function(req, res){
	Item.find({}, function(err, result) {
		if(result.length === 0) {
			Item.insertMany(defaultItems, function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("Successfully Added");
				}
			});
			res.redirect("/");
		}

		if(err) {
			console.log(err);
		} else {
			res.render("list", {listName: "Today", newListItems: result});
			console.log(result);
		}
	})
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
