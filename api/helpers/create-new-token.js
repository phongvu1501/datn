const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Create new token',

  inputs: {
    user: { type: 'ref', required: true },
  },

  fn: async function (inputs) {
    const expiresInMs = 60 * 60 * 1000; // 1 giờ
    const token = jwt.sign(
      { id: inputs.user.id, username: inputs.user.username },
      sails.config.custom.jwtSecret,
      { expiresIn: '1h' }
    );

    return {
      token,
      expiresAt: Date.now() + expiresInMs,
    };
  }
};
