const express = require("express"),
    mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	session = require("express-session"),
	MemoryStore = require("memorystore")(session),
	flash = require("connect-flash"),
	cors = require("cors"),
    app = express();
const {User, ServiceRequester, ServiceProvider} = require("./models/User.js");
const indexRoutes = require("./routes/index"),
	userRoutes = require("./routes/user");

require("dotenv").config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4c08b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log("Connected to DB");
}).catch(err => {
	console.log("ERROR", err.message);
});

app.use(session({ 
	cookie: {maxAge: 86400000}, 
	store: new MemoryStore({
		checkPeriod: 86400000
	}),
	secret: process.env.SESSION_SECRET,
	resave: false, 
	saveUninitialized: false,
}));

app.use(cors({credentials: true, origin: true}));
app.use(express.json({limit: "500kb"}));
app.use(express.urlencoded({limit: "500kb", extended: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/users/", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started");
});