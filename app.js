const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const date = require(__dirname + "/date.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const items = [];
const workItems = [];

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work list", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port);
