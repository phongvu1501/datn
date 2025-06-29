module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    price: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string',
      required: true
    }
  }
};
