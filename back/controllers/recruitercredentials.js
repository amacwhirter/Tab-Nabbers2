/**
 * Created by esterlingaccime on 6/20/17.
 */
var db = require("../models"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    express = require("express"),
    router = express.Router(),
    secret = require("../config/secrets"),
    path = require("path");



router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
});


router.post("/sign-up", function(req, res) {
    console.log(req.body);
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.log(err);
        } else {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) throw err;

                db.recruiter.create({
                    username: req.body.username,
                    password: hash
                })
                    .then(function(data) {
                        console.log(data);
                        res.status(200).json({ status: 'ok' });

                    })
                    .catch(function(err) {
                        console.log(err);
                        res.json({ message: "Something went wrong, either the user already created with that username" });
                    });
            });
        }
    })
});


router.post("/sign-in", function(req, res) {


    db.recruiter.findOne({
        username: req.body.username
    })
        .then(function(user) {
            if (!user) {
                res.json("No user found!!");
            } else {
                bcrypt.compare(req.body.password, user.password, function(err, valid) {
                    if (err) {
                        res.json("Username or password is incorrect");
                    } else {

                        var token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: {
                                username: user.username
                            }
                        }, secret);

                        res.cookie('jwtauthtoken', token, {
                            secure: process.env.NODE_ENV === 'production',
                            signed: true
                        });

                        res.json({
                            "status": "Ok",
                            token: token
                        });

                        // res.redirect("/profile");


                    }

                });
            }
        })
        .catch(function(err) {
            res.json(err);
        });
});

router.post("/profile", function(req, res){
    console.log(req.body);
    res.json("ok");
});

// Profile page for Students
// If user not logged in, they're not able to see it
router.get("/api/profile", function(req, res) {
    var currentUser = req.user;
    user = currentUser;
    console.log(user);

    db.bootcamp.findOne({
        where: {
            id: currentUser.id
        }
    }).then(function(data) {
        console.log(data);
        // console.log(data.get());
        // currentUser.institution = data.get().institution;
        //console.log(currentUser);
        console.log(currentUser);
        // console.log(req.user);
        res.render("profile", currentUser);
    });

});


module.exports = router;
