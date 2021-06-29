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
            services: req.body.services,
            contact: req.body.contact,
        }
        if (user.get("__t") == "ServiceProvider") {
            updatedUser.profession = req.body.profession;
            updatedUser.skills = req.body.skills;
            updatedUser.availability = req.body.availability;
        }
        await User.findByIdAndUpdate(req.params.id, updatedUser, {useFindAndModify: false});
        res.send("User successfully updated");
    },

    async deleteUser(req, res) {
        await User.findByIdAndDelete(req.params.id);
        res.send("User successfully deleted")
    }
}