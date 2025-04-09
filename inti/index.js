const mongoose = require("mongoose");
const initData = require("./data.js");  //require initialize data from data.js
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// connection stablish
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })

async function main(){
    await mongoose.connect(MONGO_URL);
}

// create a fn
const initDB = async () => {
    // if in our DB, already some data exist, then we completely clean it
    await Listing.deleteMany({});
    // when all data deleted, then we insert our data
    await Listing.insertMany(initData.data); //accessing key data data.js file ->which is data
    console.log("data was initialized");
}

initDB();  //call initDB fn





