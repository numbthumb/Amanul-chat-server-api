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

const aNewMessage = {
  id: 1,
  from: "Ameer",
  text: "Hello world",
};

const aNewMessage2 = {
  id: 2,
  from: "Mahbub",
  text: "The weather is attrocious",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage, aNewMessage, aNewMessage2];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

// app.post("/messages", function (request, response) {
//   let newMessage = request.body;
//   console.log(request.body)
//   newMessage.id = messages.length;
//   messages.push(newMessage);
//   response.send("Message created")
// });

app.get("/messages/:id", function (request, response) {
  
  let id = request.params.id;
  let foundMessage = messages.find(item => item.id == id)
  response.json(foundMessage);
});

app.delete("/messages/:id", function (request, response) {
  let id = request.params.id;
  messages.forEach(function(message, index) {
    if(message.id == id) {
      messages.splice(index, 1);
    }
  })
  response.json({ success: true });
});

app.post("/messages", function(request, response) {
  let newMessage = request.body;
  // console.log("incoming messages.root");
  if(newMessage.from && newMessage.text) {
    newMessage.id = messages.length;
    let messageArray = messages.push(newMessage)
    response.json({ success: messageArray });
  }
  response.sendStatus(400);
});

app.get("/output", function(request, response) {
  // response.send("hello")
  let count = 0;
  let iterationContinue = true;
  let i = messages.length-1;
  let recentTenMessages = [];
  while(iterationContinue) {
    recentTenMessages.push(messages[i]);
    count = count + 1;
    i = i - 1;
    if(count >= 10 || i < 0) {
      iterationContinue = false;
    }
  } 
  response.send(recentTenMessages);
  console.log(recentTenMessages);
})

app.get("/search", function (request, response) {
  let givenWord = request.query.term;
  let foundMessage = messages.filter((message)=> message.text.toLowerCase().includes(givenWord.toLowerCase()))
  response.json(foundMessage);
});

const listener = app.listen(process.env.PORT || 8000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// app.listen(process.env.PORT);

// app.listen(4000);
