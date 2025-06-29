/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Thêm sản phẩm
  product: async (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res.badRequest({ error: 'Thiếu tên, giá hoặc mô tả.' });
    }
    try {
      const product = await Product.create(req.body).fetch();
      return res.status(201).json({ message: 'Tạo thành công', product });
    } catch (err) {
      const msg = err.code === 'E_UNIQUE' ? 'Tên sản phẩm đã tồn tại.' : err.message;
      return res.status(400).json({ error: msg });
    }
  },

  // Lấy 1 hoặc nhiều sản phẩm
  show: async (req, res) => {
    try {
      const id = req.param('id');
      const result = id ? await Product.findOne({ id }) : await Product.find();
      if (!result || (Array.isArray(result) && !result.length)) {
        return res.notFound({ error: 'Không tìm thấy sản phẩm.' });
      }
      return res.ok(result);
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  },

  // Cập nhật sản phẩm
  update: async (req, res) => {
    const id = req.param('id');
    if (!id || !Object.keys(req.body).length) {
      return res.badRequest({ error: 'Thiếu ID hoặc dữ liệu cập nhật.' });
    }

    try {
      const product = await Product.updateOne({ id }).set(req.body);
      return product ? res.ok({ message: 'Cập nhật thành công', product }) : res.notFound({ error: 'Không tìm thấy sản phẩm.' });
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  },

  // Xóa sản phẩm
  delete: async (req, res) => {
    const id = req.param('id');
    if (!id) {
      return res.badRequest({ error: 'Thiếu ID sản phẩm.' });
    }
    try {
      const product = await Product.destroyOne({ id });
      return product ? res.ok({ message: 'Đã xóa', product }) : res.notFound({ error: 'Không tìm thấy sản phẩm.' });
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  }
};

