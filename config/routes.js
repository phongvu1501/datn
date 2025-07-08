module.exports.routes = {
  // Product API
  'POST /api/product/upload': {
    controller: 'ProductController',
    action: 'uploadImage'
  },
  'POST /api/product': {
    controller: 'ProductController',
    action: 'product'
  },
  'GET /api/product/:id?': {
    controller: 'ProductController',
    action: 'show'
  },
  'PUT /api/product/:id': {
    controller: 'ProductController',
    action: 'update'
  },
  'PUT /api/product/:id/image': {
    controller: 'ProductController',
    action: 'updateImage'
  },
  'DELETE /api/product/:id': {
    controller: 'ProductController',
    action: 'delete'
  },
  'GET /api/product/search/:query': {
    controller: 'ProductController',
    action: 'search'
  },

  // User API
  'POST /api/user/register': {
    controller: 'UserController',
    action: 'register'
  },
  'POST /api/user/login': {
    controller: 'UserController',
    action: 'login',
    policy: 'basic'
  },
  'POST /api/user/logout': {
    controller: 'UserController',
    action: 'logout',
  },
  'POST /api/user/update': {
    controller: 'UserController',
    action: 'update',
    // policy: 'jwt'
  },

  // 🖼️ Route để truy cập ảnh từ thư mục assets/uploads
  'GET /uploads/*': { skipAssets: false },
};
