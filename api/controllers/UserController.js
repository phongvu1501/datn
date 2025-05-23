/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  student: async function (req, res) {
    // try {
    //   const { name, email, age } = req.body;
    //   console.log('info', req.info);
    //   console.log('student', req.body);
    //   if (!name || !email || !age) {
    //     return res.paramInvalid({ errorMsg: 'Thành công' });
    //   }
    //   let rs = await User.checkExistUser(name);
    //   if (rs.errorCode !== constant.SUCCESS_CODE) {
    //     return res.paramInvalid({ errorMsg: rs.errorMsg });
    //   }
    //   return res.success({ data: { id: new Date().toString(), name, email, age } });
    // } catch (error) {
    //   return res.serverError(error);
    // }
    //1:Thêm
    try {
      const newUser = await User.create(req.body);
      if (!newUser) {
        return res.status(400).json({
          error: 'Thất bại khi tạo sinh viên mới.',
        });
      }
      return res.status(201).json({
        message: 'Thành công',
        user: newUser,
      });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return res.status(400).json({
          error: 'A student with this fullName or email already exists.',
        });
      }
      return res.status(500).json({
        error: 'Thất bại',
        details: error.message,
      });
    }

  },

  //2:show

  show: async function (req, res) {
    try {
      const userId = req.param('id');

      if (userId) {
        const user = await User.findOne({ id: userId });

        if (!user) {
          return res.notFound({
            errorCode: 404,
            errorMsg: 'Không tìm thấy sinh viên với ID đã cung cấp.'
          });
        }

        sails.log.info('Found user by ID:', user.id);
        return res.ok(user);

      } else {

        const allUsers = await User.find();

        if (!allUsers || allUsers.length === 0) {
          return res.notFound({
            errorCode: 404,
            errorMsg: 'No users found.'
          });
        }

        sails.log.info('Found all users. Total:', allUsers.length);
        return res.ok(allUsers);
      }

    } catch (err) {
      sails.log.error('Error fetching user(s):', err);
      return res.serverError({
        errorCode: 500,
        errorMsg: 'An unexpected error occurred while fetching student(s).',
        details: err.message,
      });
    }
  },


  //3:update                    




//4:delete

delete: async function (req, res) {
  try {
    const userId = req.param('id');

    if (!userId) {
      return res.badRequest({
        errorCode: 400,
        errorMsg: 'ID không hợp lệ.',
      });
    }

    const deletedUser = await User.destroyOne({ id: userId });

    if (!deletedUser) {
      return res.notFound({
        errorCode: 404,
        errorMsg: 'Không tìm thấy sinh viên với ID đã cung cấp.',
      });
    }

    sails.log.info('Deleted user:', deletedUser.id);
    return res.ok({
      message: 'Xóa sinh viên thành công.',
      user: deletedUser,
    });

  } catch (err) {
    sails.log.error('Error deleting user:', err);
    return res.serverError({
      errorCode: 500,
      errorMsg: 'Lỗi không xác định.',
      details: err.message,
    });
  }
},




};
