const router = require('express').Router();
let EmailAuthModel = require('../models/emailAuth.model');

router.route('/').post(             // post request used for signup
    (req, res) => {
        const newEmailAuth = new EmailAuthModel({       // create a new document with EmailAuthModel
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });

        newEmailAuth.save()             // save the document
            .then(() => res.json({      // if successful, send success message
                msg: 'user created'
            }))
            .catch(err => {             // if not, then send an error message 
                                        // (dont use status, we don't want to escape from the program)
                res.json({ msg: 'email taken', err: err});
            })
    }
)


module.exports = router;