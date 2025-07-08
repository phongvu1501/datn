function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const path = require('path');
const fs = require('fs');

module.exports = {
  //Uploads ảnh
  uploadImage: async (req, res) => {
    req.file('image').upload({
      dirname: path.resolve(sails.config.appPath, '.tmp/public/uploads'),
      maxBytes: 10 * 1024 * 1024, 
    }, (err, uploadedFiles) => {
      if (err) {
        return res.serverError({
          err: 1,
          message: 'Lỗi khi tải lên tệp: ' + err.message,
        });
      }

      // Không có file nào
      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.badRequest({
          err: 1,
          message: 'Vui lòng chọn tệp để tải lên.',
        });
      }

      const uploadedFile = uploadedFiles[0];
      const filename = path.basename(uploadedFile.fd);
      const fileExt = path.extname(filename).toLowerCase();
      const allowedExts = ['.jpg', '.jpeg', '.png', '.gif'];

      // Kiểm tra định dạng
      if (!allowedExts.includes(fileExt)) {
        // Xóa file đã upload nếu không hợp lệ
        fs.unlink(uploadedFile.fd, () => { });
        return res.badRequest({
          err: 1,
          message: 'Chỉ chấp nhận các định dạng ảnh: jpg, jpeg, png, gif.',
        });
      }

      // Trả về đường dẫn ảnh
      const imagePath = `/uploads/${filename}`;
      return res.ok({
        err: 0,
        path: imagePath,
        filename,
        message: 'Tải ảnh thành công.',
      });
    });
  },

  // Thêm sản phẩm
  product: async (req, res) => {
    try {
      const { name, price, description, image } = req.body;

      if (!name || !price || !description || !image) {
        return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
      }
      const product = await Product.create({
        name,
        price,
        description,
        image: image || '',
      })
      return res.status(200).json({ err: 0, data: product, message: 'Thêm sản phẩm thành công' });
    } catch (error) {
      return res.serverError({ err: 1, message: error.message });
    }
  },

  // Lấy 1 hoặc nhiều sản phẩm
  show: async (req, res) => {
    // try {
    //   const id = req.param('id');
    //   const result = id ? await Product.findOne({ id }) : await Product.find().sort('createdAt DESC');
    //   if (!result || (Array.isArray(result) && !result.length)) {
    //     return res.notFound({ error: 'Không tìm thấy sản phẩm.' });
    //   }
    //   return res.ok(result); // httpcode: 200.   {err:0, data:[]|{}, message:'success|error message'}
    //   return
    // } catch (err) {
    //   return res.serverError({ error: err.message });
    // }

    try {
      const { id } = req.params;
      const options = {};
      if (id) options.id = id;
      const query = Product.find(options);
      if (!id) query.sort('createdAt DESC');
      const result = await query;
      if (!result || !result.length) {
        return res.notFound({ error: 'Không tìm thấy sản phẩm.' });
      }
      return res.ok({
        err: 0,
        data: id ? result[0] : result,
        message: 'success',
      });
    } catch (error) {
      return res.serverError({
        error: 1,
        data: null,
        message: error.message || 'error',
      });
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
    try {
      const query = req.params.query || '';
      const collection = Product.getDatastore().manager.collection(Product.tableName);

      const filter = {
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } }
        ]
      };

      const result = await collection
        .find(filter, { projection: {} })
        .limit(1000)
        .skip(0)
        .toArray();

      return res.ok({ data: result });
    } catch (err) {
      return res.serverError({ error: 'Lỗi tìm kiếm sản phẩm.', details: err.message });
    }
  }

};
