module.exports.routes = {
  // ===========================
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

  // ===========================
  'POST /api/user/register': {
    controller: 'UserController',
    action: 'register'
  },
  'POST /api/user/login': {
    controller: 'UserController',
    action: 'login'
  },
  'POST /api/user/logout': {
    controller: 'UserController',
    action: 'logout'
  },
  'POST /api/user/update': {
    controller: 'UserController',
    action: 'update'
  },

  // ===========================
  'POST /api/user/:id/assign-permissions': {
    controller: 'PermissionController',
    action: 'assignPermissions'
  },

  'GET /api/permission/list': {
    controller: 'PermissionController',
    action: 'list'
  },
  'POST /api/permission/create': {
    controller: 'PermissionController',
    action: 'create'
  },
  'DELETE /api/permission/:id': {
    controller: 'PermissionController',
    action: 'delete'
  },

  // ===========================
  'GET /api/account/list': {
    controller: 'AccountController',
    action: 'listUser'
  },
  'DELETE /api/account/:id': {
    controller: 'AccountController',
    action: 'destroy'
  },
  'GET /api/user/me': {
    controller: 'UserController',
    action: 'getProfile'
  },

  // ===========================
  'GET /uploads/*': { skipAssets: false },


  'GET /api/page': {
    controller: 'DynamicPageController',
    action: 'getAll'
  },
  'GET /api/dynamic-page/:id': {
    controller: 'DynamicPageController',
    action: 'getOne'
  },
  'POST /api/dynamic-page': {
    controller: 'DynamicPageController',
    action: 'getCreate'
  },
  'PUT /api/dynamic-page/:id': {
    controller: 'DynamicPageController',
    action: 'getUpdate'
  },

  'DELETE /api/dynamic-page/:id': {
    controller: 'DynamicPageController',
    action: 'deletePage'
  },

  // ===========================

  'POST /api/user-role/set': {
    controller: 'UserRoleController',
    action: 'setUserRole'
  },

  'GET /api/user-role/list': {
    controller: 'UserRoleController',
    action: 'getListUserRole'
  },

  // ===========================
  'POST /api/permission/getListPermission': {
    controller: 'PermissionController',
    action: 'getListPermission'
  },
  'POST /api/permission/createPermission': {
    controller: 'PermissionController',
    action: 'createPermission'
  },



};
