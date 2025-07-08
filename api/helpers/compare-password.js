const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Compare password',

  description: 'So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'Mật khẩu người dùng nhập',
    },
    hashedPassword: {
      type: 'string',
      required: true,
      description: 'Mật khẩu đã được mã hóa lưu trong database',
    },
  },

  fn: async function (inputs) {
    try {
      const match = await bcrypt.compare(inputs.password, inputs.hashedPassword);
      return match;
    } catch (err) {
      throw new Error('Lỗi khi so sánh mật khẩu: ' + err.message);
    }
  }
};
