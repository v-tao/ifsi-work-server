const nodemailer = require("nodemailer");
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
require("dotenv").config();
const sendVerificationEmail = (email, uniqueString) => {
    const Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.TRANSPORT_USER,
            pass: process.env.TRANSPORT_PASS
        }
    });
    const mailOptions = {
        from: "IFSI",
        to: email,
        subject: "Email verification",
        html: `Click <a href=http://localhost:3000/verify/${uniqueString}>this</a> link to verify your email.`
    }
    Transport.sendMail(mailOptions, (err) => {
        err ? console.log(err) : console.log("Message successfully sent.");
    })
}
module.exports = {
    async checkDuplicateUser(req, res) {
        users = await User.find({username: req.params.username})
        users.length == 0 ? res.send(false) : res.send(true);
    },
    async registerServiceRequester(req, res) {
        let newUser = new ServiceRequester({
            username: req.body.username,
            verified: false,
            uniqueString: Math.random().toString().substr(2,8),
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
                    sendVerificationEmail(newUser.username, newUser.uniqueString);
                    res.send(req.user.id);
                });
            }
        });
    },

    async registerServiceProvider(req, res) {
        let newUser = new ServiceProvider({
            username: req.body.username,
            verified: false,
            uniqueString: Math.random().toString().substr(2,8),
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
                    this.sendVerificationEmail(newUser.username, newUser.uniqueString)
                    res.send(req.user.id);
                });
            }
        })
    },

    async verify(req, res) {
        let user = await User.findOne({uniqueString: req.params.uniqueString})
        if (user) {
            user.verified = true;
            await user.save();
            res.send("Your account has been verified.");
        } else {
            res.send("Error: user not found.");
        }
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