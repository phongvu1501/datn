/**
 * UserRoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    setUserRole: async function (req, res) {
      try {
          /* 
               truyền 2 tham số: userID: làid của ng dùng đc phân euyeenf
               useRoleId: là id của role đc phân quyền cho user, dạng  mảng [useRoleId ]
               */
        const { userRoleIds, userId } = req.body;
        if (!userRoleIds.length || !Array.isArray(userRoleIds) || !userId) {
            return res.badRequest({ errCode: 1, message: 'Du lieu ko hop le' });
        }
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.notFound({ errCode: 2, message: 'Không tìm thấy người dùng.' });
        }
        const userRole = await UserRole.find({ id: userRoleIds });
        if (!userRole.length) {
            return res.notFound({ errCode: 3, message: 'Không tìm thấy vai trò.' });
        }

        await User.updateOne({ id: userId }).set({
            roles: userRoleIds
        });

        return res.ok({ message: 'Phân quyền thành công' });
      } catch (error) {
          sails.log.error('Lỗi setUserRole:', error);
          return res.serverError({ errCode: 1, message: 'Có lỗi xảy ra trong quá trình phân quyền.' });
      }
    },
    getListUserRole: async function (req, res) {
        // get list nay ra ddeer admin chon set vao user
        try {
            const data = await UserRole.find()
            return res.ok({ data });
        } catch (error) {
            sails.log.error('Lỗi getListUserRole:', error);
            return res.serverError({ errCode: 1, message: 'Có lỗi xảy ra trong quá trình lấy danh sách vai trò.' });
        }
    }

};

