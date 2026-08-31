const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    }
})

//automatically salting and hashing for username and password
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

