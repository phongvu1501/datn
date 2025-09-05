const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Thiếu hoặc sai định dạng Authorization header' });
    }

    const token = parts[1];
    const secret = sails.config.custom.jwtSecret; // dùng custom nếu đã đặt trong config

    // Xác thực token
    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    // Kiểm tra token có tồn tại trong DB (nếu bạn lưu token khi login)
    const tokenInDb = await Token.find({ token });
    if (!tokenInDb) {
      return res.status(401).json({ error: 'Token đã bị xoá hoặc không tồn tại' });
    }

    // Gán dữ liệu vào request
    req.token = token;
    req.user = await User.findOne({ id: payload.id })

    if (!req.user) {
      return res.status(401).json({ error: 'Không tìm thấy người dùng' });
    }

    return next();
  } catch (err) {
    sails.log.error('Bearer policy error:', err);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};
