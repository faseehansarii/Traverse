if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

// Uses your Atlas connection string (same one Railway uses).
// Falls back to local Mongo if ATLASDB_URL isn't set.
const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/traverse";

main()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const sampleReviews = [
    { comment: "Absolutely loved staying here, would come back in a heartbeat!", rating: 5 },
    { comment: "Great location and super clean. Minor issue with the wifi but otherwise perfect.", rating: 4 },
    { comment: "Beautiful place, exactly as pictured. Host was very responsive.", rating: 5 },
    { comment: "Nice stay overall, a bit pricier than expected for what's offered.", rating: 3 },
    { comment: "Cozy and comfortable, felt like home right away.", rating: 4 },
];

async function getOrCreateOwner() {
    const existing = await User.findOne({ username: "traverse_admin" });
    if (existing) {
        console.log("Using existing owner user:", existing._id.toString());
        return existing;
    }

    const newUser = new User({
        username: "traverse_admin",
        email: "admin@traverse.com",
    });
    // passport-local-mongoose method: hashes/salts the password for you
    const registeredUser = await User.register(newUser, "TraversePass123");
    console.log("Created owner user:", registeredUser._id.toString());
    return registeredUser;
}

const initDB = async () => {
    const owner = await getOrCreateOwner();

    await Listing.deleteMany({});
    await Review.deleteMany({});

    for (const listingData of initData.data) {
        const listing = new Listing({
            ...listingData,
            owner: owner._id,
        });

        // 2-3 random reviews per listing
        const reviewCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const shuffled = [...sampleReviews].sort(() => 0.5 - Math.random());
        const chosenReviews = shuffled.slice(0, reviewCount);

        const createdReviews = await Review.insertMany(
            chosenReviews.map((r) => ({
                comment: r.comment,
                rating: r.rating,
                author: owner._id,
            }))
        );

        listing.reviews = createdReviews.map((r) => r._id);
        await listing.save();
    }

    console.log(`Seeded ${initData.data.length} listings with reviews.`);
};

initDB().then(() => {
    mongoose.connection.close();
});
