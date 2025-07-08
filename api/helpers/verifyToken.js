// api/helpers/verifytoken.js
const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify token',

  description: 'Xác thực JWT và trả về payload nếu hợp lệ.',

  inputs: {
    token: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Token hợp lệ',
    },
    invalid: {
      description: 'Token không hợp lệ',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const decoded = jwt.verify(inputs.token, sails.config.custom.jwtSecret);
      return exits.success(decoded);
    } catch (e) {
      return exits.invalid({ message: 'Invalid token' });
    }
  },
};
