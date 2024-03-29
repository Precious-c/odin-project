const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/UserModel")

passport.use(
    new LocalStrategy({ usernameField: "email"}, async (username, password, done) => {
        try{
            const user = await User.findOne({ username: username });
            if(!user) {
                return done(null, false, { message: "Incorrect username" });
            };
            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                return done(null, false, { message: "Incorrect password "});
            };
            return done(null, user);
        } catch(err) {
            return done(err)
        }
    })
);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try{
        const user = await user.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
  });


// //Passport config
// passport.use(
//     new LocalStrategy(async (username, password, done) => {
//         try{
//             const user = await User.findOne({ username: username });
//             if(!user) {
//                 return done(null, false, { message: "Incorrect username" });
//             };
//             const match = await bcrypt.compare(password, user.password)
//             if(!match) {
//                 return done(null, false, { message: "Incorrect password "});
//             };
//             return done(null, user);
//         } catch(err) {
//             return done(err)
//         };
//     })
// );

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser( async (id, done) => {
//     try{
//         const user = await User.findById(id);
//         done(null, user);
//     } catch(err) {
//         done(err);
//     }
// })