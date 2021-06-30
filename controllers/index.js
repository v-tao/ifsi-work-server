const {User, ServiceRequester, ServiceProvider} = require("../models/User");
const passport = require("passport"),
    multer = require("multer"),
    cloudinary = require("cloudinary"),
    dotenv = require("dotenv");
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
const upload = multer({storage: storage, fileFilter: imageFilter});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
module.exports = {
    async registerServiceRequester(req, res) {
        let newUser = new ServiceRequester({
            username: req.body.username,
            name: req.body.name,
            name_lower : req.body.name.toLowerCase(),
            image: req.body.image,
            location: req.body.location,
            location_lower : req.body.location.toLowerCase(),
            services: req.body.services,
            contact: req.body.contact,
        });
        if (req.file) {
            let result = await cloudinary.v2.uploader.upload(req.file.path, {quality:"auto", fetch_format:"auto", folder:"ifsi-work-app"});
            newUser.image = result.secure_url;
            newUser.imageId = result.public_id;
        }
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
            name_lower: req.body.name.toLowerCase(),
            image: req.body.image,
            location: req.body.location,
            location_lower: req.body.location.toLowerCase(),
            services: req.body.services,
            contact: req.body.contact,
            skills: req.body.skills,
            availability: req.body.availability,
        });
        if (req.file) {
            let result = await cloudinary.v2.uploader.upload(req.file.path, {quality:"auto", fetch_format:"auto", folder:"ifsi-work-app"});
            newUser.image = result.secure_url;
            newUser.imageId = result.public_id;
        }
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
        res.send("Successfully logged out")
    }
}