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
                passport.authenticate("local", {
                    failureFlash: true, 
                    successFlash: "Registration successful"
                })(req, res, () => {
                    res.send(req.user.id);
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
                passport.authenticate("local", {
                    failureFlash: true, 
                    successFlash: "Registration successful"
                })(req, res, () => {
                    res.send(req.user.id);
                });
            }
        })
    },

    async login(req, res) {
        passport.authenticate("local", {
            failureFlash: true, 
            successFlash: "Successfully logged in"
        })(req, res, () => {
            res.send(req.user.id);
        });
    },

    async logout(req, res) {
        req.logout();
    }
}