/**
 * Auth.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

setTimeout(async () => {
  try {

    let data = {
      user: 1,
      username: new Date().getTime().toString(),
      password: sails.services.auth.genUUID(),
      email: 'abc@gmail.com',
      phone: new Date().getTime().toString().substring(0, 10),
      client: 'student',
      status: 'active',
    };
    let finds = await Auth.findOne({ id: 1 });
    if (finds?.id) {
      let updated = await Auth.update({ id: { '>': 0 } }, { status: 'inactive' });
    }
    // let created = await Auth.create(data);

    //navtive
    let rs = await sails.sendNativeQuery('SELECT * FROM auth WHERE id = 1');
    console.log({ rs });

    // transaction

    await sails.getDatastore().transaction(async (db, done) => {
      try {
        let phone = '0987666665'
        // let userObj = await User.updateOne({ id: 1 }, { phone }).usingConnection(db);
        let updated = await Auth.update({ id: 1 }, { phone }).usingConnection(db);
        console.log({ updated });
        done() // rollback
        // done() // commit
      } catch (error) {
        throw new Error('Transaction error');
      }
    })

    // handel notification



    console.log({ finds });
  } catch (error) {
    return common.serverError(error);
  }

}, 5 * 1000);


module.exports = {
  attributes: {
    user: {
      type: 'number',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    phone: {
      type: 'string',
      required: true,
      custom: function (value) {
        return /^\d{10}$/.test(value); // Validate phone number format
      },
    },
    client: {
      type: 'string',
      required: true,
      isIn: ['student', 'teacher', 'admin'], // Validate client type
    },
    status: {
      type: 'string',
      isIn: ['active', 'inactive', 'locked', 'deleted'],
      defaultsTo: 'active',
    },


  },



  checkExistUser: async function (username) {
    // Check if the user exists in the database
    const isExsited = username === '1234567890'
    if (isExsited) {
      return common.error({ errorMsg: 'User already exists' }); // Simulate a user already exists
    }
    return common.success({ data: { id: 1111 } }); // // Simulate a user not found
  }

};