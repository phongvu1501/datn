/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  student: async function (req, res) {
    try {
      const { name, email, age } = req.body;
      console.log('info', req.info);
      console.log('student', req.body);
      if (!name || !email || !age) {
        return res.paramInvalid({ errorMsg: 'Thành công' });
      }
      let rs = await User.checkExistUser(name);
      if (rs.errorCode !== constant.SUCCESS_CODE) {
        return res.paramInvalid({ errorMsg: rs.errorMsg });
      }
      return res.success({ data: { id: new Date().toString(), name, email, age } });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
