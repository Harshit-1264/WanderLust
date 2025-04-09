const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); //require listing from models folder
const path = require("path");
const methodOverride = require("method-override"); //for convert POST req to PUT for updation in DB
const ejsMate = require("ejs-mate"); //helps to create many templates(creating layouts)

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true})); //for parsing the data which comes under req
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); 

async function main(){
    await mongoose.connect(MONGO_URL);
}

// root route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// Index Route
app.get("/listings", async (req, res) => {  //now we have to pass this data to our ejs template
    const allListings = await Listing.find({}); //empty
    res.render("listings/index.ejs", {allListings});  //create in listings in index.ejs file
});

// New Route                       //new route ko show route se upar rakhege nhi to new ko id samghega
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
// perform Read opr -> print all data of any individual listing
app.get("/listings/:id", async(req, res) => {  //all data returns for this perticular id
    let {id} = req.params; //extracting id
    const listing = await Listing.findById(id); //now id occurs, now we find data with help of id -> & Whatever data comes, we will pass it to show.js
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async(req, res) => {
    // let {title, description, image, price, location, country} = req.body;   //first way
    // let listing = req.body.listing; //convert into key value pair in new.ejs
    // console.log(listing);

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params; //extracting id
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params; //extracting id
    await Listing.findByIdAndUpdate(id, {...req.body.listing});  //fist parameter -> id & second para me object pass karege jisme reconstruct karege req.body.listing ko
    // req.body.listing -> its a JS object jiske andar sare ke sare parameters hai
    // jisko reconstruct karke unko ham individual values ke andar convert karge jisko nyi update value ke andar pass karege
    res.redirect(`/listings/${id}`); //redirect it on show.ejs page
});

// Delete Route
app.delete("/listings/:id", async(req, res) => {
    let{ id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// // creating new route /testListing
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India", 
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});