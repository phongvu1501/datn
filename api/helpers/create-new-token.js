const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Create new token',

  inputs: {
    user: { type: 'ref', required: true },
    client: { type: 'string', defaultsTo: 'web' },
    deviceId: { type: 'string', defaultsTo: '' },
    channel: { type: 'string', defaultsTo: 'web' },
    ip: { type: 'string', defaultsTo: '' }
  },

  fn: async function (inputs) {
    const expiresInMs = 60 * 60 * 1000; // 1 giờ
    const token = jwt.sign(
      { id: inputs.user.id, username: inputs.user.username },
      sails.config.custom.jwtSecret,
      { expiresIn: '1h' }
    );

    const expiredAt = new Date(Date.now() + expiresInMs);

    await Token.create({
      token,
      client: inputs.client || 'web',
      expiredAt,
      user: inputs.user.id,
      deviceId: inputs.deviceId || '',
      channel: inputs.channel || 'web',
      ip: inputs.ip || '',
      status: 1
    });

    return {
      token,
      expiresAt: expiredAt.getTime()
    };
  }
};
