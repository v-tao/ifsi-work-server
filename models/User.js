const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    image: String,
    location: String,
})

const User = mongoose.model("User", userSchema)
const ServiceRequester = User.discriminator("ServiceRequester", new mongoose.Schema({
    servicesRequested: [{type: String}]
}));
const ServiceProvider = User.discriminator("ServiceProvider",new mongoose.Schema({
    profession: String, 
    skills: [{type: String}],
    availability: [{type: String}],
    servicesOffered: [{
        service: String,
        rate: String
    }],
    contact: String,
}))