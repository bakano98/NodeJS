// encapsulates all CRUD operations
const assert = require("assert");

const insertDocument = (db, document, collection, callback) => {
  const collections = db.collection(collection);
  // perform operations on the collection!
  collections.insertOne(document, (err, result) => {
    assert.equal(err, null); // ensure no errors
    console.log("Inserted ", result);

    // simply gives the result as a callback, so we can access it as (result) outside!
    callback(result);
  });
};

const findDocuments = (db, collection, callback) => {
  const collections = db.collection(collection);
  collections.find({}).toArray((err, docs) => {
    assert.equal(err, null); // ensure no errors
    callback(docs); // just give back docs to callback
  });
};

const removeDocument = (db, document, collection, callback) => {
  const collections = db.collection(collection);
  // find the first object that matches and delete it
  collections.deleteOne(document, (err, result) => {
    assert.equal(err, null); // ensure no errors
    // note that document is a JSON object
    console.log("Removed the document ", document, "successfully");
    callback(result); // give back the result
  });
};

const updateDocument = (db, document, update, collection, callback) => {
  const collections = db.collection(collection);
  // arg0: document, arg1: fields to update, arg2: null, arg3: callback
  collections.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null); // ensure no errors
    console.log("Updated document with ", update);
    callback(result);
  });
};

module.exports = {
  insert: insertDocument,
  find: findDocuments,
  remove: removeDocument,
  update: updateDocument,
};
