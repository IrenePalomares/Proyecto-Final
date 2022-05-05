const passport = require('passport');
const LocalStrategy = require('passport-local');

const Iniciar = require('..session/models/');

passport.use(new LocalStrategy ({
    usernameField: 'email'
}, async (email, password, done) => {
    
}))