const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect
  .then((db) => {
    console.log("Connected to the database server");

    var newDish = Dishes({
      name: "Pizza",
      description: "mmm cheesy delicious goodness",
    });

    newDish
      .save()
      .then((dish) => {
        console.log(dish);
        return Dishes.find({}).exec();
      })
      .then((dishes) => {
        console.log(dishes);
        // removes all the dishes in db
        return Dishes.remove({});
      })
      .then((dishes) => {
        console.log(dishes);
        // close the connection to db
        return mongoose.connection.close();
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .catch((e) => console.log(e));
