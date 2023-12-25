const express = require('express');
const { json } = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const datarouter = require('./router/index.js');  // Update this line
const { connectToDatabase } = require('./db/mongodb');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

connectToDatabase()
    .then(() => {
        console.log("connected to database");
    })
    .then(() => {
        console.log("route running...");
        app.use("/data", datarouter);  // Update this line

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((e) => {
        console.log("Error in connecting to MongoDB database", e);
    });
