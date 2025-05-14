/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

setTimeout(async () => {
  try {
    let data = {
      name: 'phong ',
      email: 'phongvvph52328@gmail.com',
      age: 20,
    };

    let createdUser = await User.create(data).fetch();

    const findUser = await User.find();

    const result = findUser.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      };
    });

    let updatedUser = await User.update({ id: createdUser.id }, { age: 21 }).fetch();

    let rs = await sails.sendNativeQuery('SELECT * FROM user WHERE id = 1');

    console.log(rs.rows);

    console.log('Người dùng đã cập nhật:', updatedUser);

    // console.log('Danh sách người dùng:', result);

    // console.log('Người dùng đã tạo:', createdUser);
    
    // console.log('Người dùng đã tìm thấy:', findUser);

    return res.success({ data: result });


  } catch (error) {
    throw new Error('Error creating user');
  }
}, 1000);



module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    age: { type: 'number', required: true },
  },
};
