const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require('mongoose');


// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  text: String,
  instructions: String,
  ingredients: String,
  upvotes: Number
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);



// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// connect to the database
mongoose.connect('mongodb+srv://searleja:for260plzNohack@cluster0.xt65e.mongodb.net/cproj4?retryWrites=true&w=majority', {
  useNewUrlParser: true
});



// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    text: req.body.text,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    upvotes: req.body.upvotes
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.text = req.body.text;
    item.instructions = req.body.instructions;
    item.ingredients = req.body.ingredients;
    item.upvotes = req.body.upvotes;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});








app.listen(3000, () => console.log('Server listening on port 3000!'));
