function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const path = require('path');

module.exports = {
  // Thêm sản phẩm
  product: async (req, res) => {
    try {
      req.file('image').upload({
        dirname: path.resolve(sails.config.appPath, './.tmp/public/uploads'), 
        maxBytes: 10 * 1024 * 1024,
      }, async (err, uploadedFiles) => {
        if (err) return res.serverError(err);

        const { name, price, description } = req.body;
        if (!name || !price || !description) {
          return res.badRequest({ error: 'Thiếu tên, giá hoặc mô tả.' });
        }

        const imagePath = uploadedFiles.length
          ? '/uploads/' + path.basename(uploadedFiles[0].fd)
          : '';
        const product = await Product.create({
          name,
          price,
          description,
          image: imagePath,
        }).fetch();

        return res.status(201).json({ message: 'Tạo thành công', product });
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Lấy 1 hoặc nhiều sản phẩm
  show: async (req, res) => {
    try {
      const id = req.param('id');
      const result = id ? await Product.findOne({ id }) : await Product.find().sort('createdAt DESC');
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
    if (!id) return res.badRequest({ error: 'Thiếu ID sản phẩm.' });

    req.file('image').upload({
      dirname: path.resolve(sails.config.appPath, './.tmp/public/uploads'), 
    }, async (err, uploadedFiles) => {
      if (err) return res.serverError(err);

      const { name, price, description } = req.body;
      const updateData = { name, price, description };

      if (uploadedFiles.length) {
        updateData.image = '/uploads/' + path.basename(uploadedFiles[0].fd);
      }

      try {
        const updated = await Product.updateOne({ id }).set(updateData);
        if (!updated) return res.notFound({ error: 'Không tìm thấy sản phẩm.' });
        return res.ok({ message: 'Cập nhật thành công', product: updated });
      } catch (err) {
        return res.serverError(err);
      }
    });
  },

  // Xoá sản phẩm
  delete: async (req, res) => {
    const id = req.param('id');
    if (!id) {
      return res.badRequest({ error: 'Thiếu ID sản phẩm.' });
    }
    try {
      const product = await Product.destroyOne({ id });
      return product ? res.ok({ message: 'Đã xoá', product }) : res.notFound({ error: 'Không tìm thấy sản phẩm.' });
    } catch (err) {
      return res.serverError({ error: err.message });
    }
  },

  // Tìm kiếm sản phẩm
  search: async (req, res) => {
    let collection = Product.getDatastore().manager.collection(Product.tableName);

    const temp = {
      pipeline: {
        name: { $regex: new RegExp(escapeRegex(req.params.query), 'i') },
        description: { $regex: new RegExp(escapeRegex(req.params.query), 'i') }
      },
      select: {},
      limit: 1000,
      skip: 0
    }

    const result = await collection.find(temp.pipeline, { projection: temp.select }).limit(temp.limit).skip(temp.skip).toArray();

    if (!result || !result.length) {
      return res.notFound({ error: 'Không tìm thấy sản phẩm.' });
    } else {
      return res.ok(result);
    }
  }
};
