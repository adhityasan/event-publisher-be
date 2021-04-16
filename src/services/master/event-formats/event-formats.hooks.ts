// Don't remove this comment. It's needed to format import lines nicely.
const search = require('feathers-mongodb-fuzzy-search');

export default {
  before: {
    all: [],
    find: [
      search({
        fields: ['format']
      })
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
