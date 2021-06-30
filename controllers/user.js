const {User, ServiceRequester, ServiceProvider} = require("../models/User");
const parseQuery = (query) => query.toLowerCase().replace("+", " ")
module.exports = {
    async getUsers(req, res) {
        let user = await User.findById(req.user.id);
        let query = {};
        if (req.query.name) query.name_lower = parseQuery(req.query.name);
        if (req.query.location) query.location_lower = parseQuery(req.query.location);
        if (req.query.service) query.services = {$elemMatch: {title_lower: parseQuery(req.query.service.toLowerCase)}};
        switch (user.get("__t")) {
            case "ServiceRequester":
                query.__t = "ServiceProvider"
                break;
            case "ServiceProvider":
                query.__t = "ServiceRequester"
                break;
        }
        res.json(await User.find(query));
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
        await User.findByIdAndUpdate(req.params.id, updatedUser, {useFindAndModify: false});
        if (user.get("__t") == "ServiceProvider") {
            user.skills = req.body.skills;
            user.availability = req.body.availability;
            user.save();
        }
        res.send("User successfully updated");
    },

    async deleteUser(req, res) {
        await User.findByIdAndDelete(req.params.id);
        res.send("User successfully deleted");
    }
}