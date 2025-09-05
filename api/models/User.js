module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Tên đăng nhập của người dùng'
    },
    password: {
      type: 'string',
      required: true,
      description: 'Mật khẩu'
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      description: 'Email'
    },
    phone: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 15,
      description: 'SĐT'
    },
    roles: {
      type: 'json',
      description: 'Danh sách vai trò của người dùng',
      columnType: 'array',
      defaultsTo: []
    },

  }
};
