const express = require("express"),
    mongoose = require("mongoose"),
    app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

require("dotenv").config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4c08b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log("Connected to DB");
}).catch(err => {
	console.log("ERROR", err.message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started");
});