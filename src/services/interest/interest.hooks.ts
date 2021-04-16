import * as authentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
// Don't remove this comment. It's needed to format import lines nicely.

const { protect } = local.hooks;

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
    all: [protect('password', 'verifyToken')],
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
