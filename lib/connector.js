const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');



const dbPassword = "Sr0OHQZJqn0m6aPH"//ask jaimie
const url = 'mongodb+srv://jaimie:'+ dbPassword +'@cluster0-9tzwz.azure.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url, { useNewUrlParser: true });



var dbactions = {
  createUser : (json , callback) => {
    client.connect(err => {
      const collection = client.db("hospitalhero").collection("users");

      collection.insertOne(json, (err, r) => {

        callback(r.ops[0])
      })
    });
  },
  findUser : (id , callback) => {
    client.connect(err => {
      const collection = client.db("hospitalhero").collection("users");

      collection.findOne({_id:ObjectId(id)}, (err, doc)=>{
        if (err) throw err;
        console.log("find user");
        console.log(doc);
        callback(doc);
      })
    })
  },
  updateUser : (id, json , callback) => {
    console.log(json);
    client.connect(err => {
      const collection = client.db("hospitalhero").collection("users");

      collection.updateOne({"_id":ObjectId(id)}, {$set: json}, (err, doc)=>{

        callback();
      })
    })
  },
  find : (query , callback) => {

    client.connect(err => {
      const collection = client.db("hospitalhero").collection("users");

      collection.find(query).toArray( (err, doc)=>{

        callback(doc);
      })
    })
  },
};

module.exports = {dbactions: dbactions};
