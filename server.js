const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.post("/messages", function (request, response) {
  let newMessage = request.body;
  console.log(request.body)
  newMessage.id = messages.length;
  messages.push(newMessage);
  response.send("Message created")
});

app.get("/messages/:id", function (request, response) {
  
  let id = request.params.id;
  let foundMessage = messages.find(item => item.id == id)
  response.json(foundMessage);
});

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// app.listen(process.env.PORT);

// app.listen(4000);
