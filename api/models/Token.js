module.exports = {
  attributes: {
    token: {
      type: 'string',
      required: true,
      description: 'Token đại diện cho phiên đăng nhập'
    },

    client: {
      type: 'string',
      required: true,
      description: 'Đối tượng sử dụng token'
    },

    expiredAt: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
      description: 'Thời điểm token hết hạn'
    },

    user: {
      type: 'string',
      required: true,
      description: 'ID người dùng'
    },

    deviceId: {
      type: 'string',
      defaultsTo: '',
      description: 'Thiết bị tạo token (mobile, web...)'
    },

    status: {
      type: 'number',
      isIn: [0, 1, 2, 3],
      defaultsTo: 1,
      description: 'Trạng thái của token'
    },

    channel: {
      type: 'string',
      defaultsTo: 'mobile',
      description: 'Kênh tạo token'
    },

    ip: {
      type: 'string',
      defaultsTo: '',
      description: 'Địa chỉ IP tạo token'
    }
  },
};
