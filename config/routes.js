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
 // API routes
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
 'DELETE /api/product/:id': {
   controller: 'ProductController',
   action: 'delete'
 }
};
