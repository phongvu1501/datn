/**
 * Auth.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {



  },

  checkExistUser: async function (username) {
    // Check if the user exists in the database
    const isExsited = username === '1234567890'
    if (isExsited) {
      return { errorCode: 1, errorMsg: 'User exists' }; // Simulate a user found
    }
    return { errorCode: 0, errorMsg: 'User does not exist' }; // Simulate a user not found
  }

};

