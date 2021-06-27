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
            location: req.body.location,
            services: req.body.services,
            contact: req.body.contact,
        }
        if (req.file) {
            cloudinary.v2.uploader.destroy(user.imageId);
            let result = await cloudinary.v2.uploader.upload(req.file.path, {quality:"auto", fetch_format:"auto", folder:"ifsi-work-app"});
            updatedUser.image = result.secure_url;
            updatedUser.imageId = result.public_id;
        }
        if (user.get("__t") == "ServiceProvider") {
            updatedUser.profession = req.body.profession;
            updatedUser.skills = req.body.skills;
            updatedUser.availability = req.body.availability;
        }
        await User.findByIdAndUpdate(req.params.id, updatedUser, {useFindAndModify: false});
        req.flash("success", "User successfully updated")
        res.redirect("/users/" + req.params.id);
    },

    async deleteUser(req, res) {
        await User.findByIdAndDelete(req.params.id);
    }
}