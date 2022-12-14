const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "....";
const dbName = "bharath";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Database connection established!!");
  const db = client.db(dbName);
});
