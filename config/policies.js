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
  AuthController: {
    register: ['verifyDevice', 'basic'], // isStudent
    login: ['verifyDevice', 'basic'], // isStudent
    logout: ['verifyDevice', 'basic'], // isStudent
    changePassword: ['verifyDevice', 'basic'], // isStudent
    forgotPassword: ['verifyDevice', 'basic'], // isStudent
    resetPassword: ['verifyDevice', 'basic'], // isStudent
    verifyEmail: ['verifyDevice', 'basic'], // isStudent
    verifyPhone: ['verifyDevice', 'basic'], // isStudent  
  }


};
