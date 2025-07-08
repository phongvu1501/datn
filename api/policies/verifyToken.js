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
      return res.forbidden({ message: 'Token không tồn tại hoặc đã bị xoá.' });
    }

    req.token = token;
    req.user = payload;
    return proceed();
  } catch (err) {
    return res.forbidden({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};
