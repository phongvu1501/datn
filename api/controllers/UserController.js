/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Thêm sinh viên
  student: async (req, res) => {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res.badRequest({ error: 'Thiếu tên hoặc email.' });
    }

    try {
      const user = await User.create(req.body).fetch();
      return res.status(201).json({ message: 'Tạo thành công', user });
    } catch (err) {
      const msg = err.code === 'E_UNIQUE' ? 'Tên hoặc email đã tồn tại.' : err.message;
      return res.status(400).json({ error: msg });
    }
  },

  // Lấy 1 hoặc nhiều sinh viên
  show: async (req, res) => {
    try {
      const id = req.param('id');
      const result = id ? await User.findOne({ id }) : await User.find();
      if (!result || (Array.isArray(result) && !result.length)) {
        return res.notFound({ error: 'Không tìm thấy sinh viên.' });
      }
      return res.ok(result);
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  },

  // Cập nhật sinh viên
  update: async (req, res) => {
    const id = req.param('id');
    if (!id || !Object.keys(req.body).length) {
      return res.badRequest({ error: 'Thiếu ID hoặc dữ liệu cập nhật.' });
    }

    try {
      const user = await User.updateOne({ id }).set(req.body);
      return user ? res.ok({ message: 'Cập nhật thành công', user }) : res.notFound({ error: 'Không tìm thấy sinh viên.' });
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  },

  // Xóa sinh viên
  delete: async (req, res) => {
    const id = req.param('id');
    if (!id) {
      return res.badRequest({ error: 'Thiếu ID sinh viên.' });
    }

    try {
      const user = await User.destroyOne({ id });
      return user ? res.ok({ message: 'Đã xóa', user }) : res.notFound({ error: 'Không tìm thấy sinh viên.' });
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  }
};

