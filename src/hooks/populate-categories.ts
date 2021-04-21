// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook } from '@feathersjs/feathers';
import commons from 'feathers-hooks-common';

export default (): Hook => {
  return commons.populate({
    schema: {
      include: [
        {
          service: 'master/event-categories',
          nameAs: 'eventCategories',
          parentField: 'eventCategories',
          childField: '_id',
          query: {
            $select: ['_id', 'category']
          },
          asArray: true
        }
      ]
    }
  });
};
