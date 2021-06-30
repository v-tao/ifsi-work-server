const {User, ServiceRequester, ServiceProvider} = require("../models/User");
module.exports = {
	checkLogin: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.send("Must be logged in.");
		}
	},
	
	async checkUser(req, res, next) {
		let user = await User.findById(req.params.id);
		if (user.id == req.user_id) {
			next();
		} else {
			res.send("You do not have permission to do that.");
		}
	},
	
	errorHandler: fn => (req, res, next) => {
		return Promise
			.resolve(fn(req, res, next))
			.catch(next)
	}
}