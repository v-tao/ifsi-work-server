const {User, ServiceRequester, ServiceProvider} = require("../models/User");
const passport = require("passport");
module.exports = {
    async registerServiceRequester(req, res) {
        let newUser = new ServiceRequester({
            username: req.body.username,
            name: req.body.name,
            image: req.body.image,
            location: req.body.location,
            services: req.body.services,
            contact: req.body.contact,
        });
        User.register(newUser, req.body.password, (err) => {
            if(err) {
                res.send(err);
            } else {
                req.flash("success", "Registration successful");
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/users");
                });
            }
        });
    },

    async registerServiceProvider(req, res) {
        let newUser = new ServiceProvider({
            username: req.body.username,
            name: req.body.name,
            image: req.body.image,
            location: req.body.location,
            services: req.body.services,
            contact: req.body.contact,
            profession: req.body.profession,
            skills: req.body.skills,
            availability: req.body.availability,
        });
        User.register(newUser, req.body.password, (err) => {
            if (err) {
                res.send(err);
            } else {
                req.flash("success", "Registration successful");
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/users");
                })
            }
        })
    },

    async login(req, res) {
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Login successful")
            res.redirect("/users")
        });
    },

    async logout(req, res) {
        req.logout();
    }
}