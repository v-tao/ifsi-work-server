const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    image: String,
    location: String,
    services: [{
        title: String,
        rate: String,
        description: String,
    }],
    contact: [{type: String}],
});

userSchema.plugin(passportLocalMongoose);
userSchema.methods.validPassword = password => this.password === password;

const User = mongoose.model("User", userSchema)
const ServiceRequester = User.discriminator("ServiceRequester", new mongoose.Schema({}));
const ServiceProvider = User.discriminator("ServiceProvider",new mongoose.Schema({
    profession: String, 
    skills: [{type: String}],
    availability: [{type: String}],
}));


module.exports = {User, ServiceRequester, ServiceProvider}