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

function paginator(items, page, per_page) {
  page = page || 1;
  per_page = per_page || 10;
  let offset = (page - 1) * per_page;
  let paginatedItems = items.slice(offset).slice(0, per_page);
  let total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total_items: items.length,
    total_pages: total_pages,
    items_data: paginatedItems
  };
}

//user click on sort buttons
app.post("/Sort", (req, res) => {
  console.log(req.body);
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
      let mysort = { [Object.keys(req.body)[0]]: Object.values(req.body)[0] };
      //console.log(mysort)
      database
        .collection("Jobs")
        .find()
        .sort(mysort)
        .toArray(function(err, result) {
          if (err) throw err;
          res.send(
            paginator(result, req.body.page, req.body.showItem).items_data
          );
          client.close();
        });
      //console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
});

//Display data firstime
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
        .count()
        .then(length => {
          res.send({length})
          client.close();
        });
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
