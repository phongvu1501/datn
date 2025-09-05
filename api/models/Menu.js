/**
 * Menu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    code: { type: 'string', required: true },
    name: { type: 'string', required: true },
    state: { type: 'string', required: true },//in angular
    parent: { type: 'string', defaultsTo: '' },
    sltPerms: { type: 'json', defaultsTo: [], columnType: 'array' },
    subMenu: { type: 'json', columnType: 'array' },
    status: { type: 'string', defaultsTo: 'active' },// active and inactive
    icon: { type: 'string' },
    priority: { type: 'number', columnType: 'integer' }
  },

};

