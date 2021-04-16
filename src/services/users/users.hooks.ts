import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import commons from 'feathers-hooks-common';
const search = require('feathers-mongodb-fuzzy-search');
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      search({
        fields: ['email', 'name']
      })
    ],
    get: [authenticate('jwt')],
    create: [commons.disallow('external'), hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'verifyToken')
    ],
    find: [],
    get: [
      commons.populate({
        schema: {
          include: [
            {
              service: 'master/event-categories',
              nameAs: 'interest',
              parentField: 'interest',
              childField: '_id',
              query: {
                $select: ['_id', 'category']
              },
              asArray: true
            }
          ]
        }
      })
    ],
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
