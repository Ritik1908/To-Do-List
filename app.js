const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")


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

const listSchema = {
	name: String,
	items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

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
			// console.log(result);
		}
	})
});

app.post("/", function(req, res){
	const listName = req.body.listName;
	const itemName = req.body.newItem;

	const item = new Item({
		name: itemName
	});

	if(listName === "Today"){
		item.save();
		res.redirect("/");
	} else {
			List.findOne({name: listName}, function(err, foundList){
			foundList.items.push(item);
			foundList.save();
			res.redirect("/"+listName);
		})
	}


});

app.post("/delete", function(req, res){
	const itemId = req.body.checkbox;
	const listName = req.body.listName;

	if(listName === "Today") {
	 	Item.findByIdAndRemove(itemId, function(err){
			if(err) {
				console.log(err);
			} else {
				res.redirect("/");
			}
		});
	} else {
		List.findOneAndUpdate(
			{name: listName},
			{$pull: {items: {_id: itemId}}},
			function(err, foundList) {
				if(!err){
					res.redirect("/"+listName);
				}
			}
		);
	}
});

app.get("/:listName", function(req, res) {
	// const customListName = _.capitalize(req.params.listName);
	const customListName = req.params.listName;

	List.findOne({name: customListName}, function(err, foundList){
		if(err) {
			console.log(err);
		} else {
			if(!foundList) {
				const list = new List({
					name: customListName,
					items: defaultItems
				});
				list.save();
				res.redirect("/"+customListName);s
			} else {
				res.render("list", {listName: foundList.name, newListItems: foundList.items})
			}
		}
	});
});

app.listen(3000, function() {
	console.log("Server Successfully Created");
});
