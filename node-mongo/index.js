// Allows us to connect to db server..
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const operations = require("./operations");

const URL = "mongodb://localhost:27017";
const dbname = "conFusion";

// promise way of handling operations!
// First, connect to the server at given URL
MongoClient.connect(URL)
  .then((client) => {
    console.log("connected to the server");
    const db = client.db(dbname);

    // then we begin to do the operations, chaining the promises
    operations
      .insert(db, { name: "u gay boi", description: "super gay." }, "dishes")
      .then((result) => {
        console.log("Inserted some stuff ", result);
        return operations.find(db, "dishes");
      })
      .then((docs) => {
        console.log("found some stuff:\n", docs);
        return operations.update(
          db,
          { name: "u gay boi", description: "super gay" },
          { name: "super loyal boi", description: "super loyal" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("hehe i updated stuff! here:\n", result);
        return operations.find(db, "dishes");
      })
      .then((docs) => {
        console.log("just felt like checking:\n", docs);
        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log(
          "dropped everything in the db, should be undefined: ",
          result
        );
        client.close();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

// MongoClient.connect(URL, (err, client) => {
//   assert.equal(err, null); // check if there is an error! if there isn't, then it should be null.
//   console.log("connected successfully");

//   // connect to database
//   const db = client.db(dbname);

//   // then we perform a series of operations...
//   operations.insert(
//     db,
//     { name: "u gay boi", description: "super gay. honestly" },
//     "dishes",
//     (result) => {
//       console.log(result);
//       // call next ops
//       operations.find(db, "dishes", (docs) => {
//         console.log("Found:\n\n", docs);

//         operations.update(
//           db,
//           { name: "u gay boi", description: "super gay. honestly" },
//           { name: "haha not gay anymore", description: "yay not gay" },
//           "dishes",
//           (result) => {
//             console.log("Updated:\n", result);
//             operations.find(db, "dishes", (docs) => {
//               console.log("Found:\n\n", docs);

//               // lastly, delete the collections then drop the connection
//               db.dropCollection("dishes", (result) => {
//                 // result should be undefined since it's dropped
//                 console.log("Dropped collections:\n", result);
//                 client.close();
//               });
//             });
//           }
//         );
//       });
//     }
//   );
// });
