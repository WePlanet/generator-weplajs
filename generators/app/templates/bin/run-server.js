'use strict';

const logTags = require('../app/components/log-tags');

module.exports = (app, port) => {
  return new Promise(resolve => {
    app.listen(port, () => {
      resolve(
          `${logTags.StartupInfo} Server listening on port ${port} ${process.env.NODE_ENV} mode`
      );
    });
  });
};
