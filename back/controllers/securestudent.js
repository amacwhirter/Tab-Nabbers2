/**
 * Created by esterlingaccime on 6/20/17.
 */
var db = require("../models"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    express = require("express"),
    router = express.Router(),
    secret = require("../config/secrets");


router.use(function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        jwt.verify(token, secret, function (err, decoded) {
            if(err){
                return res.json({success: false, message: 'Failed to authenticate token'});
            } else{
                req.decoded = decoded;

                next();
            }
        });
    } else{
        return res.status(403).send({
            success:false,
            message: 'No token provided'
        });
    }
});



router.get("/students", function (req, res, next) {
    db.user.find({})
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            console.log(err);
        });
});


module.exports = router;