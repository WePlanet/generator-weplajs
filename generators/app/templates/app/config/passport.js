'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const util = require('../components/util');
const errors = require('../components/errors');

const setup = () => {
  const options = {
    usernameField: 'email',
    passwordField: 'password'
  };

  passport.use(new LocalStrategy(options, (email, password, done) => {
    return models.User.findOne({where: {email: email}})
        .then(user => {
          if (!user) return done(null, false);

          const incorrectPassword = util.passwordHash(password) !==
              user.get({plain: true}).password;
          if (incorrectPassword) {
            return done(new errors.BadRequest(errors.Codes.IncorrectPassword));
          }

          return done(null, user);
        })
        .catch(err => done(err));
  }));
};

module.exports = setup;
