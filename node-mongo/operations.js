// encapsulates all CRUD operations
const assert = require("assert");

// looks much cleaner here too
const insertDocument = (db, document, collection, callback) => {
  // declares the collection that we want to access
  const collections = db.collection(collection);
  // perform operations on the collection!
  
  
  /* callback way of doing it: (not recommended honestly)
  collections.insert(document, (err, result) => {
    assert.equal(err, null);
    console.log("inserted: " + result);
    callback(result)
  })*/
  // this returns a promise by default if no callback is assigned
  return collections.insertOne(document);
};

const findDocuments = (db, collection, callback) => {
  const collections = db.collection(collection);
  return collections.find({}).toArray();
};

const removeDocument = (db, document, collection, callback) => {
  const collections = db.collection(collection);
  // find the first object that matches and delete it
  collections.deleteOne(document);
};

const updateDocument = (db, document, update, collection, callback) => {
  const collections = db.collection(collection);
  // arg0: document, arg1: fields to update, arg2: null, arg3: callback
  // if no callback, by default returns a promise
  return collections.updateOne(document, { $set: update }, null);
};

module.exports = {
  insert: insertDocument,
  find: findDocuments,
  remove: removeDocument,
  update: updateDocument,
};
