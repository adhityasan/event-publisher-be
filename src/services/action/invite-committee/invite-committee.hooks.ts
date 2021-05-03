import * as authentication from '@feathersjs/authentication';
import populateEventOrganizer from '../../../hooks/populate-event-organizer';
import populateUsers from '../../../hooks/populate-users';
import setField from '../../../hooks/set-field';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), setField({ as: 'data.userId', from: 'params.user._id' })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateUsers({ nameAs: 'to', parentField: 'to', asArray: false, $select: ['_id', 'name', 'email'] })],
    get: [],
    create: [
      populateUsers({ nameAs: 'from', parentField: 'from', asArray: false, $select: ['_id', 'name', 'email'] }),
      populateEventOrganizer()
    ],
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
