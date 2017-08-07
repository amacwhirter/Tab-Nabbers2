/**
 * Created by esterlingaccime on 6/20/17.
 */
var db = require("../models"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    express = require("express"),
    router = express.Router(),
    secret = require("../config/secrets"),
    path = require("path"),
    formidable = require('formidable'),
    fs = require('fs-extra'),
    cloudinary = require('cloudinary'),
    axios = require("axios");


var path = require('path'), //used for file path
    fs = require('fs-extra'),
    atlanta = require('../../front/public/atlanta.json');

var gtBootcamp = atlanta.children[0].children,
    gtCohort1 = gtBootcamp[0].children,
    gtCohort2 = gtBootcamp[1].children,
    gtCohort3 = gtBootcamp[2].children;

var gaBootcamp = atlanta.children[1].children,
    gaCohort1 = gaBootcamp[0].children,
    gaCohort2 = gaBootcamp[1].children,
    gaCohort3 = gaBootcamp[2].children;

var iyBootcamp = atlanta.children[2].children,
    iyCohort1 = iyBootcamp[0].children,
    iyCohort2 = iyBootcamp[1].children,
    iyCohort3 = iyBootcamp[2].children;


// router.get("/event/data", function (req, res, next) {
//     var group = []
//
//
//     axios.get("https://api.meetup.com/find/groups?page=20&text=JavaScript&key=6b6f260644b44657a442955d383013&sig_id=197617558&sig=8742e95d91419cc26b093bd4070f2beba7415bf3")
//         .then(function (response) {
//             response.JSON();
//         })
//         .catch(function (er) {
//             console.log(er);
//
//         });
//
//     res.json(group)
// });

var user ;

cloudinary.config({
    cloud_name: 'profile-images',
    api_key: '958681958972474',
    api_secret: 'dDX2LC1yjF9dp-6E9fYgVTSITbw'
});

router.get("/bootcamps", function(req, res) {
    db.bootcamp.findAll({}).then(function(bootcamps) {
        res.json(bootcamps);
    })
});

router.post("/cohorts", function(req, res) {
    db.cohort.findAll({
        where: {
            bootcampId: req.body.bootcampId
        }
    }).then(function(cohorts) {
        res.json(cohorts);
    })
});

router.post("/sign-up", function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.log(err);
        } else {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) throw err;

                db.user.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                        bootcampId: req.body.bootcampId,
                        cohortId: req.body.cohortId
                    })
                    .then(function(user) {
                        console.log("Return Object: %s", user);
                        var token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: {
                                id: user.id
                            }
                        }, secret);
                        res.json({
                            id: user.id,
                            token: token
                        });
                    })
                    .catch(function(err) {
                        res.status(400).json({ message: 'Error adding user to database. Entry not created' });
                    });
            });
        }
    })
});

router.post("/sign-in", function(req, res) {
    console.log("Attempting Sign-in");
    db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(user) {
            if (!user) {
                res.json("No user found!!");
            } else {
                bcrypt.compare(req.body.password, user.password, function(err, valid) {
                    if (err) {
                        throw err;
                    }
                    if (valid) {
                        var token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: {
                                id: user.id
                            }
                        }, secret);
                        res.json({
                            id: user.id,
                            token: token
                        });
                        // res.redirect("/profile");
                    } else {
                        res.status(401).send({ 'message': 'Unauthorized' });
                    }
                });
            }
        })
        .catch(function(err) {
            res.json(err);
        });
});


router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/../../front/public/index.html"));
});
router.get("/signout", function(req, res) {
    res.redirect("/");
})

router.post("/profile", function(req, res) {

    console.log(req.body);
    var info = {
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        github: req.body.github,
        about: req.body.about,
        last_login: req.body.last_login
            // status:req.body.status
    };

    // res.json(req.body);

    //console.log(info);

    db.user.update(req.body, {
            where: {
                id: req.body.userID
            }
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

// Profile page for Students
// If user not logged in, they're not able to see it
router.post("/api/profile", function(req, res) {
    //console.log(req.params);

    user = req.body;

     db.user.findOne({
         where:{
             id:req.body.userID
         }
     })
         .then(function (data) {
             var info = {
                 title:data.title,
                 firstname: data.firstname,
                 lastname: data.lastname,
                 job: data.job,
                 email: data.email,
                 phoneNumber: data.phoneNumber,
                 site: data.site,
                 gender: data.gender,
                 birthday: data.birthday,
                 street: data.street,
                 addr: data.addr,
                 address: data.address,
                 homeaddress: data.homeaddress,
                 github: data.github,
                 photo: data.photo
             }

             res.json(info);
         })
         .catch(function (err) {
             console.log(err);

             res.json("Nothing")
         });


});

router.post('/upload', function(req, res, next) {
    console.log(user);

    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        cloudinary.v2.uploader.upload(
            files.fileUploaded.path, {
                use_filename: true,
                transformation: {
                    width: 250,
                    height: 300,
                    crop: "thumb",
                    radius: 20,
                },
                eager: {
                    width: 250,
                    height: 300,
                    crop: "thumb",
                    gravity: "face",
                }
            },
        function(error, result) {
            console.log(result);
            var profileUpdate = {
                photo: result.public_id,
                photoUrl: result.secure_url
            };

            //console.log(req.body);
            db.user.update({photo: profileUpdate.photo, photoUrl: profileUpdate.photoUrl}, {
                where:{
                    id: user.userID
                }
            })
                .then(function (data) {
                    res.redirect("profile")
                })
                .catch(function (err) {
                    res.json(err);
                })
        })
    });
});



// Dashboard included the map that recruiters see
// If user not logged in, they're not able to see it
router.get("/map", function(req, res) {
    // Reset Georgia Tech Coding BootCamp
    gtBootcamp[0].children = [];
    gtBootcamp[1].children = [];
    gtBootcamp[2].children = [];

    // Reset Iron Yard Coding BootCamp
    iyBootcamp[0].children = [];
    iyBootcamp[1].children = [];
    iyBootcamp[2].children = [];

    // Reset General Assembly Coding Bootcamp
    gaBootcamp[0].children = [];
    gaBootcamp[1].children = [];
    gaBootcamp[2].children = [];


    db.user.findAll({raw: true}).then(function (data) {

        data.map(function (el) {
            // console.log(el.photo);
            // console.log(data);

            var obj = {
                name: el.firstname,
                id: "'" + el.id + "'",
                img: el.photoUrl,
                size: 40000,
                email: el.email,
                phone: el.phoneNumber,
                github: el.github,
                lastname: el.lastname
            };

            if (el.photo === null) {
                obj.img = "./img/avatar-default.png";
            }
            if (el.phone === undefined) {
                obj.phone = "";

            }
            if (el.github === null) {
                obj.github = "";

            }

            var gaTech = function () {
                if (el.cohortId === 1) {
                    var currentIds = [];
                    for (var i = 0; i < gtCohort1.length; i++) {
                        currentIds.push(gtCohort1[i].id);
                        console.log(currentIds);
                    }

                    console.log(obj.id);
                    gtBootcamp[0].children.push(obj);
                }
                if (el.cohortId === 2) {
                    gtBootcamp[1].children.push(obj);
                }
                if (el.cohortId === 3) {
                    gtBootcamp[2].children.push(obj);
                }
            };

            var ironYard = function () {
                if (el.cohortId === 4) {
                    iyBootcamp[0].children.push(obj);
                }

                if (el.cohortId === 5) {
                    iyBootcamp[1].children.push(obj);
                }

                if (el.cohortId === 6) {
                    iyBootcamp[2].children.push(obj);

                }
            };

            var gAssembly = function () {
                if (el.cohortId === 7) {
                    gaBootcamp[0].children.push(obj);
                }

                if (el.cohortId === 8) {
                    gaBootcamp[1].children.push(obj);
                }

                if (el.cohortId === 9) {
                    gaBootcamp[2].children.push(obj);

                }
            };

            switch (el.bootcampId) {
                case 1:
                    gaTech();
                    break;
                case 2:
                    ironYard();
                    break;
                case 3:
                    gAssembly();
                    break;
                default:
                    console.log("User not found");
            }
        });

        fs.readFile('../../public/atlanta.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                json = JSON.stringify(atlanta); //convert it back to json
                console.log(json);
                fs.writeFile('../../public/atlanta.json', json, 'utf8'); // write it back
                res.sendFile(path.join(__dirname + "/../../public/index.html"));

            }
        });
    });

});


router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/../../front/public/index.html"));
});

module.exports = router;