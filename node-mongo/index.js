const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "....";
const dbName = "bharath";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Database connection established!!");
  const db = client.db(dbName);
  const collectionName = "users"
  const collection = db.collection(collectionName);
  const query = {
    "userId": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };
  collection.insertOne(query, (err, result) => {
    assert.equal(err, null);
    console.log("After insert");
    console.log("result", result.ops);
    collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found documents",docs);
        db.dropCollection(collectionName, (err, req) => {
            assert.equal(err, null);
            client.close();
        })
    })
  });
});
