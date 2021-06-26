const {User, ServiceRequester, ServiceProvider} = require("../models/User");
module.exports = {
    async getUsers(req, res) {
        let user = await User.findById(req.user.id)
        if (user.get("__t") == "ServiceRequester"){
            let serviceProviders = await User.find({__t: "ServiceProvider"});
            res.json(serviceProviders);
        } else if (user.get("__t") == "ServiceProvider"){
            let serviceRequesters = await User.find({__t: "ServiceRequester"});
            res.json(serviceRequesters);
        }
    },

    async getUser(req, res) {
        let user = await User.findById(req.params.id);
        res.json(user);
    },

    async updateUser(req, res) {
        let user = await User.findById(req.params.id);
        let updatedUser = {
            name: req.body.name,
            image: req.body.image,
            location: req.body.location,
        }
        if (user.get("__t") == "ServiceRequester") {
            updatedUser.servicesRequested = req.body.servicesRequested;
        } else if (user.get("__t") == "ServiceProvider") {
            updatedUser.profession = req.body.profession;
            updatedUser.skills = req.body.skills;
            updatedUser.availability = req.body.availability;
            updatedUser.servicesOffered = req.body.servicesOffered;
            updatedUser.contact = req.body.contact;
        }
        await User.findByIdAndUpdate(req.params.id, updatedUser, {useFindAndModify: false});
        req.flash("success", "User successfully updated")
        res.redirect("/users/" + req.params.id);
    },

    async deleteUser(req, res) {
        await User.findByIdAndDelete(req.params.id);
    }
}