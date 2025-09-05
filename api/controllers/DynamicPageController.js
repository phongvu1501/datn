module.exports = {
  getAll: async (req, res) => {
    const pages = await DynamicPage.find();
    return res.json(
      { errCode: 0, data: pages, message: 'Dynamic pages retrieved successfully' }
    );
  },

  getOne: async (req, res) => {
    const page = await DynamicPage.findOne({ id: req.params.id });
    return res.json({ errCode: 0, data: page, message: 'Dynamic page retrieved successfully' });
  },

  getCreate: async (req, res) => {
    try {
      const { name, config } = req.body;
      if (!name || !config) {
        return res.status(400).json({ errCode: 1, errMessage: 'Thiếu tên hoặc cấu hình' });
      }

      const newPage = await DynamicPage.create({ name, config });
      return res.json({ errCode: 0, data: newPage, message: 'Tạo trang động thành công' });
    } catch (error) {
      return res.status(500).json({ errCode: 1, errMessage: 'Lỗi server', error: error.message });
    }
  },

  getUpdate: async (req, res) => {
    try {
      const { name, config } = req.body;
      const id = req.params.id;

      if (!id || !config) {
        return res.status(400).json({ errCode: 1, errMessage: 'Thiếu id hoặc config' });
      }

      const updated = await DynamicPage.updateOne({ id }).set({ name, config });

      if (!updated) {
        return res.status(404).json({ errCode: 1, errMessage: 'Không tìm thấy trang để cập nhật' });
      }

      return res.json({ errCode: 0, message: 'Cập nhật thành công' });
    } catch (err) {
      return res.status(500).json({ errCode: 1, errMessage: 'Lỗi server', error: err.message });
    }
  },
  deletePage: async function (req, res) {
  try {
    const pageId = req.params.id;
    if (!pageId) return res.badRequest({ errCode: 1, errMessage: 'Thiếu ID' });

    const deleted = await DynamicPage.destroyOne({ id: pageId });

    if (!deleted) {
      return res.notFound({ errCode: 1, errMessage: 'Không tìm thấy trang cần xoá' });
    }

    return res.ok({ errCode: 0, errMessage: 'Xóa thành công', data: deleted });
  } catch (err) {
    sails.log.error('Lỗi khi xoá trang:', err);
    return res.serverError({ errCode: 1, errMessage: 'Lỗi server khi xoá trang' });
  }
}




};
