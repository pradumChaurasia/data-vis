var MongoClient = require('mongodb').MongoClient;

var connectionURL = "mongodb+srv://pradum19441:kmprB7jkP57nWESi@cluster0.8nh72li.mongodb.net/?retryWrites=true&w=majority";
var dbName = "data-visual";

async function connectToDatabase() {
  try {
    var client = await MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true,tlsAllowInvalidCertificates: true });
    var db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase: connectToDatabase
};
