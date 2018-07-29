const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwtSecret = process.env.JWT_SECRET;


//Serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//Deserialize user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.error('There was an error accessing the records of' +
                ' user with id: ' + id);
            return console.log(err.message);
        }
        return done(null, user);
    })
});


//DB call, returned user object is pre-formatted and ready for storing in JWT
//THIS IS A WORKING CODE
// passport.use(new LocalStrategy({
//         usernameField: 'githubUsername',
//         passwordField: 'password'
//     },
//     function(githubUsername, password, cb) {
//         return Users.findOne({ githubUsername, password })
//             .then(user => {
//                 if (!user) {
//                     return cb(null, false, { message: 'Incorrect User name or password' });
//                 }
//                 return cb(null, user, { messgae: 'Logged In Successfully' });
//             })
//             .catch(err => cb(err));
//     }
// ));

//Checking if the user already exist
// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromHeader('Authorization'),
//         secretOrKey: jwtSecret
//     },
//     function(jwtPayload, cb) {
//         return Users.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));

//----------------------------------- Local strategy ---------------------------------------//
passport.use('local-signup', new LocalStrategy({
        githubUsername: 'githubUsername',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, githubUsername, password, done) {
        process.nextTick(function() {
            User.findOne({ githubUsername: githubUsername }, function(err, user) {
                if (err) {
                    return errHandler(err);
                }
                if (user) {
                    console.log('user already exists');
                    return done(null, false, { errMsg: 'githubUsername already exists' });
                } else {
                    var newUser = new User();
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;
                    newUser.location = req.body.location;
                    newUser.githubUsername = req.body.githubUsername;
                    newUser.password = newUser.generateHash(password);
                    //need to check how to implement pwd comparision
                    newUser.confirmPassword = newUser.confirmPassword;
                    newUser.save(function(err) {
                        if (err) {
                            console.log(err);
                            if (err.message == 'User validation failed') {
                                console.log(err.message);
                                return done(null, false, { errMsg: 'Please fill all fields' });
                            }
                            return errHandler(err);
                        }
                        console.log('New user successfully created...', newUser.username);
                        console.log('githubUsername', githubUsername);
                        console.log(newUser);
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

//---------------------------local login----------------------------------------//
passport.use('local-login', new LocalStrategy({
        githubUsername: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, githubUsername, password, done) {
        User.findOne({ githubUsername: githubUsername }, function(err, user) {
            if (err) {
                return errHandler(err);
            }
            if (!user) {
                return done(null, false, {
                    errMsg: 'User does not exist, please' +
                        ' <a class="errMsg" href="/signup">signup</a>'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { errMsg: 'Invalid password try again' });
            }
            return done(null, user);
        });

    }));

module.exports = passport;