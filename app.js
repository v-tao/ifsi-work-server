const express = require("express"),
    app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started");
});