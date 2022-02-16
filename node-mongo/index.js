// Allows us to connect to db server..
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const URL = "mongodb://localhost:27017";
const dbname = "conFusion";

MongoClient.connect(URL, (err, client) => {
  assert.equal(err, null); // check if there is an error! if there isn't, then it should be null.
  console.log("connected successfully");

  // connect to database
  const db = client.db(dbname);
  const collection = db.collection("dishes");

  // inserts one item into db.dishes
  // arg[0] = JSON object
  // arg[1] = callback
  collection.insertOne(
    { name: "Uthapizza", description: "U THA PIZZA!!" },
    (err, result) => {
      assert.equal(err, null); // make sure it successfully added

      console.log("inserted successfully");
      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        console.log("Found stuff");
        // print out all items that have been found
        console.log(docs);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);
          client.close(); // close the connection to the database
        });
      });
    }
  );
});
