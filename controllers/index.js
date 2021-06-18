const {User, ServiceRequester, ServiceProvider} = require("../models/User");
const passport = require("passport");

module.exports = {
    async registerServiceRequester(req, res) {
        let newUser = new ServiceRequester({
            username: req.body.username,
            accountType: "serviceRequester",
            name: req.body.name,
            image: req.body.image,
            location: req.body.location,
            servicesRequested: req.body.servicesRequested,
        });
        ServiceRequester.register(newUser, req.body.password, (err) => {
            if(err) {
                // flash some message
                console.log(err)
            } else {
                passport.authenticate("local")(req, res, () => {
                    //placeholder route
                    res.redirect("/");
                });
            }
        });
    },

    async registerServiceProvider(req, res) {
        let newUser = new ServiceProvider({
            username: req.body.username,
            accountType: "serviceProvider",
            name: req.body.name,
            image: req.body.image,
            location: req.body.location,
            profession: req.body.profession,
            skills: req.body.skills,
            availability: req.body.availability,
            servicesOffered: req.body.servicesOffered,
            contact: req.body.contact,
        });
        ServiceProvider.register(newUser, req.body.password, (err) => {
            if (err) {
                // flash some message
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () => {
                    // placeholder route
                    res.redirect("/");
                })
            }
        })
    }
}