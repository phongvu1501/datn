/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  '*': false, // Default policy for all controllers and actions (allow public access)
  AuthController: {
    register: ['verifyDevice', 'basic'], // 
    login: ['verifyDevice', 'basic'],
  },

  UserController: {
    register: [],
    login: [],
    logout: ['bearer'],
    update: ['bearer', 'checkRole'],
    getProfile: ['bearer'],
    student: ['verifyDevice', 'basic', 'bearer'],

  },
  UserRoleController: {
    getListUserRole: ['bearer'],
  },
  ProductController: {
    products: ['bearer'],
  }
};
