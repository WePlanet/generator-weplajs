'use strict';

const passport = require('passport');
const auth = require('../../../components/auth-service.js');
const errors = require('../../../components/errors');
const crypto = require('crypto');
const User = require('../../../lib/User');

module.exports = {
  
  login(req, res, next) {
    const  responseToClient = user => {
      if (!user) return next(errors.NotFound(errors.Codes.NoUser));
      
      user.accessToken = auth.signToken(user.id);
      user.save()
          .then(user => {
            user = user.get({plain: true});
            delete user.password;
            res.status(201).json({user: user});
          })
          .catch(err => res.status(500).json({error: err}));
    };
    
    passport.authenticate('local', (err, user, info) => {
      err = err || info;
      if (err) return next(errors.Unauthorized(err));

      responseToClient(user);
    })(req, res, next);
  },
  
  logout(options) {
    return Promise.resolve()
        .then(() => User.update({accessToken: '', id: options.context.user.id}))
        .then(user => {
          return { user: user }
        });
  },
  
  resetPassword(options) {
    const newPassword = crypto.randomBytes(3).toString('hex');
    return User.changePassword(options.email, newPassword)
        .then(() => {
          return {newPasswrod: newPassword};
          // todo: send email
        });
  }
  
};
