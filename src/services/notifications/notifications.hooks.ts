import * as authentication from '@feathersjs/authentication';
import populateUsers from '../../hooks/populate-users';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateUsers({ nameAs: 'from', parentField: 'from', asArray: false, $select: ['_id', 'name', 'email'] })],
    get: [populateUsers({ nameAs: 'from', parentField: 'from', asArray: false, $select: ['_id', 'name', 'email'] })],
    create: [populateUsers({ nameAs: 'from', parentField: 'from', asArray: false, $select: ['_id', 'name', 'email'] })],
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
