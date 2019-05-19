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

//send data length to creates buttons
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
          res.send({ length });
          client.close();
        });
    }
  );
});

//remove duplicate from array
function removeDuplicate(arr) {
  const unique = arr
       .map(e => e['_id'])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
}

//If user input, return result
app.post("/Query", (req, res) => {
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

      let query1 = { post_date: { $regex: req.body.query, $options: "is" } };
      var myPromise1 = () => {
        return new Promise((resolve, reject) => {
          database
            .collection("Jobs")
            .find(query1)
            .toArray((err, data) => {
              err ? reject(err) : resolve(data);
            });
        });
      };

      let query2 = { company_name: { $regex: req.body.query, $options: "is" } };
      var myPromise2 = () => {
        return new Promise((resolve, reject) => {
          database
            .collection("Jobs")
            .find(query2)
            .toArray((err, data) => {
              err ? reject(err) : resolve(data);
            });
        });
      };

      let query3 = { address: { $regex: req.body.query, $options: "is" } };
      var myPromise3 = () => {
        return new Promise((resolve, reject) => {
          database
            .collection("Jobs")
            .find(query3)
            .toArray((err, data) => {
              err ? reject(err) : resolve(data);
            });
        });
      };

      let query4 = { position: { $regex: req.body.query, $options: "is" } };
      var myPromise4 = () => {
        return new Promise((resolve, reject) => {
          database
            .collection("Jobs")
            .find(query4)
            .toArray((err, data) => {
              err ? reject(err) : resolve(data);
            });
        });
      };

      let query5 = { salaray: { $regex: req.body.query, $options: "is" } };
      var myPromise5 = () => {
        return new Promise((resolve, reject) => {
          database
            .collection("Jobs")
            .find(query5)
            .toArray((err, data) => {
              err ? reject(err) : resolve(data);
            });
        });
      };

      let query6 = { contactInfo: { $regex: req.body.query, $options: "is" } };
      var myPromise6 = () => {
        return new Promise((resolve, reject) => {
          database
            .collection("Jobs")
            .find(query6)
            .toArray((err, data) => {
              err ? reject(err) : resolve(data);
            });
        });
      };

      var callMyPromise = async () => {
        let allresult = [];
        var result1 = await myPromise1();
        var result2 = await myPromise2();
        var result3 = await myPromise3();
        var result4 = await myPromise4();
        var result5 = await myPromise5();
        var result6 = await myPromise6();
        allresult = allresult
          .concat(result1)
          .concat(result2)
          .concat(result3)
          .concat(result4)
          .concat(result5)
          .concat(result6);

        allresult = removeDuplicate(allresult);

        //anything here is executed after result is resolved
        return allresult;
      };

      callMyPromise().then(function(result) {
        client.close();
        res.send(result);
      });
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
