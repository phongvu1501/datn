/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /api/auth/register': {
    controller: 'AuthController',
    action: 'register',
  },
  'POST /api/user/student': {
    controller: 'UserController',
    action: 'student',
  },
    'GET /api/user/student': {
    controller: 'UserController',
    action: 'show',
  },
  'GET /api/user/student/:id': {
    controller: 'UserController',
    action: 'show',
  },

  'DELETE /api/user/student/:id': {
    controller: 'UserController',
    action: 'delete',
  },





};
