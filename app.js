

require("dotenv").config();
const express = require("express");

const port = 3000;
const mongoose = require("mongoose");
const { WEB_PORT, MONGODB_URI } = process.env;

const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) =>{
res.render("index.ejs");});
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  


mongoose.connect('mongodb://127.0.0.1:27017/productlist', { useNewUrlParser: true });
console.log(process.env.PORT);
//mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//const { WEB_PORT, MONGODB_URI } = process.env;



 


const dataController = require("./controllers/listProducts");
app.get("/listProducts", dataController.list);
app.get("/listProducts/delete/:id", dataController.delete);

app.get("/createProduct", (req, res) => {res.render ("createProduct")});
app.post("/createProduct", dataController.create);
//app.get("/createProduct/create", dataController.create);



mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});


app.listen(port, () =>{
    console.log(`app listening at http://localhost:${port}`);
});