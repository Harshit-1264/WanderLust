const mongoose = require("mongoose");
const Schema = mongoose.Schema; //defining a variable schema

// Schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {   //we take img in URL 
        type: String,
        // if img not created, that time we also want default value, then copy same URL of v (jab img nhi aa rahi uske liye default value set kiya)
        default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        set: (v) => //set checks img is present, but its link empty -> this condition for client (jab img aa rahi but img khali hai)
            v === ""
                ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                : v,  //set ternary operator -> if v equals to empty string, then assign a link. if not equals put original value
    } , 
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
});

// model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;   //now export this to app.js
