const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.forbidden({ message: 'Thiếu hoặc sai định dạng Authorization header.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, sails.config.custom.jwtSecret);

    const existingToken = await Token.findOne({ token });
    if (!existingToken) {
      return res.forbidden({ message: 'Token đã bị xoá hoặc không hợp lệ.', logout: true });
    }

    const user = await User.findOne({ id: payload.id }).populate('roles');
    if (!user) {
      return res.forbidden({ message: 'Không tìm thấy người dùng.' });
    }

    req.token = token;
    req.user = user;

    return proceed();
  } catch (err) {
    sails.log.error('verifyToken error:', err);
    return res.forbidden({ message: 'Token không hợp lệ hoặc đã hết hạn.', logout: true });
  }
};
