import * as authentication from '@feathersjs/authentication';
import populateCategories from '../../hooks/populate-categories';
import populateEventOrganizer from '../../hooks/populate-event-organizer';
import populateEventOrganizerManual from '../../hooks/populate-event-organizer-manual';
import populateFormats from '../../hooks/populate-formats';
import setField from '../../hooks/set-field';
const search = require('feathers-mongodb-fuzzy-search');
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [
      search({
        fields: ['title', 'subtitle']
      })
    ],
    get: [],
    create: [authenticate('jwt'), setField({ as: 'data.creator', from: 'params.user._id' })],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [populateCategories(), populateFormats(), populateEventOrganizer(), populateEventOrganizerManual()],
    get: [populateCategories(), populateFormats(), populateEventOrganizer()],
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
