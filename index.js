const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL =
  "mongodb+srv://rex:1234Testing@cluster0-7pv9s.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "newDB";

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/Display", function(req, res) {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      //Access or Create Database
      database = client.db(DATABASE_NAME);

      //Access or Create Collection
      collection = database.collection("Jobs");

      //console.log(req.body.type);

      //console.log(mysort)
      database
        .collection("Jobs")
        .find()
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result);
          client.close();
        });
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
