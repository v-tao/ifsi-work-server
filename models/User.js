const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    verified: {type: Boolean, default: false},
    uniqueString: String,
    name: String,
    name_lower: String,
    image: String,
    imageId: String,
    location: String,
    location_lower: String,
    services: [{
        title: String,
        title_lower: String,
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
    skills: [{type: String}],
    availability: [{type: String}],
}));


module.exports = {User, ServiceRequester, ServiceProvider}