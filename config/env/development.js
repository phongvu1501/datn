/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {


  /**************************************************************************
  *                                                                         *
  * Tell Sails what database(s) it should use in production.                *
  *                                                                         *
  * (https://sailsjs.com/config/datastores)                                 *
  *                                                                         *
  **************************************************************************/
  datastores: {
    default: {
      // adapter: 'sails-mongo',
      // // url: 'mongodb+srv://phongvvph52328:<db_password>@cluster0.crqbfpo.mongodb.net/',
      // // url: 'mongodb+srv://phongvvph52328:pPVSREOW7u8BlhK1@cluster0.crqbfpo.mongodb.net/quanlyhocsinh',//pPVSREOW7u8BlhK1
      // url: 'mongodb+srv://150105Ph213133:150105Ph213133@cluster0.crqbfpo.mongodb.net/quanlyhocsinh'
      adapter: 'sails-mongo',
      // url: 'mongodb+srv://150105Ph213133:150105Ph213133@cluster0.crqbfpo.mongodb.net/quanlyhocsinh',
      url: 'mongodb://127.0.0.1:27017/quanlyhocsinh',

    }


  },
  port: 1337,






};
