/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  student: async function (req, res) {
    try {
      const { username, password } = req.body;
      console.log('info', req.info);
      console.log('register', req.body);
      if (!username || !password) {
        return res.paramInvalid({ errorMsg: 'Thành công' });
      }
      let rs = await Auth.checkExistUser(username);
      if (rs.errorCode !== constant.SUCCESS_CODE) {
        return res.paramInvalid({ errorMsg: rs.errorMsg });
      }
      return res.success({ data: { id: new Date().toString(), username, password } });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
