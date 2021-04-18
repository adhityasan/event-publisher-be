import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
const dauria = require('dauria');
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      (context: HookContext): void => {
        if (context.params.file) {
          const file = context.params.file;
          const base64 = dauria.getBase64DataURI(file.buffer, file.mimetype);
          context.data = { uri: base64 };
        }
      }
    ],
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
