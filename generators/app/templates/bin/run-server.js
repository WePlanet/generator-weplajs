'use strict';

const logTags = require('../app/components/logTags');

module.exports = (app, port) => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve(
          `${logTags.StartupInfo} Server listening on port ${port} ${process.env.NODE_ENV} mode`
      );
    });
  });
};
