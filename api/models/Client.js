module.exports = {
  attributes: {
     name: {
      type: 'string',
      required: true,
      description: 'Tên của người dùng',
    },
    code: {
      type: 'string',
      required: true,
      description: 'Mã của người dùng',
    },
    token: {
      type: 'string',
      required: true,
      description: 'Token cho người dùng',
    }
  }
};
