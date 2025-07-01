/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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
  },


  //Tìm kiếm sản phẩm
  search: async (req, res) => {
    // const query = req.params.query;
    // if (!query) {
    //   return res.badRequest({ error: 'Thiếu từ khóa tìm kiếm.' });
    // }

    // try {
    //   const escapedQuery = escapeRegex(query);
    //   const products = await Product.find({
    //     where: {
    //       name: { regex: new RegExp(escapedQuery, 'i') }
    //     }
    //   });

    //   return products.length
    //     ? res.ok(products)
    //     : res.notFound({ error: 'Không tìm thấy sản phẩm.' });
    // } catch (err) {
    //   console.error("Search error:", err); 
    //   return res.status(500).json({
    //     errorCode: 500,
    //     errorMsg: 'Lỗi hệ thống'
    //   });
    // }

    // const result = await Product.find({
    //   name: { contains: 'sơ mi' } // alias của regex trong Waterline (MongoDB)
    // });
    // console.log(result);

    let collection = Product.getDatastore().manager.collection(Product.tableName);

    const temp = {
      pipeline: {
        name: { $regex: new RegExp(escapeRegex(req.params.query), 'i') } 
      },
      select: {},
      limit: 1000
    }

    const result = await collection.find(temp.pipeline, { projection: temp.select }).limit(temp.limit).toArray();

    if (!result || !result.length) {
      return res.notFound({ error: 'Không tìm thấy sản phẩm.' });
    } else {
      return res.ok(result);
    }

    //console.log(result);


  }




};

