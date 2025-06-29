/**
 * PingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    ping:async function (req, res) {
        return res.json({
            message: 'pong',
            status: 200,
            data: null
        });
    }

};

