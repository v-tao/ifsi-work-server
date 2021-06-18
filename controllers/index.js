const {User, ServiceRequester, ServiceProvider} = require("../models/User");
const passport = require("passport")

module.exports = {
    async registerServiceRequester(req, res, next) {
        let newUser = new ServiceRequester({
            username: req.body.username,
            accountType: "serviceRequester",
            name: req.body.name,
            image: req.body.image,
            location: req.body.location,
            servicesRequested: req.body.servicesRequested,
        });
        ServiceRequester.register(newUser, req.body.password, (err, user) => {
            if(err) {
                // flash some message
                console.log(err)
            } else {
                console.log(newUser);
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/");
                })
            }
        })
    }
}