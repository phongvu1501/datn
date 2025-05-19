/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

setTimeout(async () => {
  const createUser = async () => {
    try {
      let data = {
        name: 'vu van phong ',
        email: 'phongvvph52328@gmail.com',
        age: 20,
      };
      let emailexist = await User.find({ email: data.email }).limit(1)
      if (emailexist?.length) {
        return common.paramError({ errorMsg: 'Email đã tồn tại' });
      }
      let createdUser = await User.create(data)
      const findUser = await User.find({});
      const result = findUser.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
        };
      });

      let updatedUser = await User.update({ id: createdUser.id }, { age: 21 })

      let rs = await sails.sendNativeQuery('SELECT * FROM user WHERE id = 1');

      console.log(rs.rows);

      console.log('Người dùng đã cập nhật:', updatedUser);

      // console.log('Danh sách người dùng:', result);

      // console.log('Người dùng đã tạo:', createdUser);

      // console.log('Người dùng đã tìm thấy:', findUser);

      let deletedUser = await User.destroy({ id: createdUser.id })

      console.log('Người dùng đã xóa:', deletedUser);

      return common.success({ data: result });
    } catch (error) {
      return common.serverError(error);
    }
  };
  let rs = await createUser();
  console.log('Kết quả:', rs);
  // return res.json(rs);

}, 15 * 1000);



module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, },
    age: { type: 'number', required: true },
  },
};
