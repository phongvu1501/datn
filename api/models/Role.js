module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    // permissions: {
    //   collection: 'permission',
    //   via: 'roles'
    // },
    // users: { // Đổi từ "user" sang "users"
    //   collection: 'user',
    //   via: 'roles'
    // }
  }
};
