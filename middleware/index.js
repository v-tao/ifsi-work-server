const {User, ServiceRequester, ServiceProvider} = require("../models/User");
module.exports = {
	checkLogin: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect("/login");
	},
	
	async checkUser(req, res, next) {
		let user = await User.findById(req.params.id);
		if (user.id == req.user_id) {
			next();
		}
		req.flash("error", "You do not have permission to do that");
		res.redirect("/users");
	},
	
	errorHandler: fn => (req, res, next) => {
		return Promise
			.resolve(fn(req, res, next))
			.catch(next)
	}
}