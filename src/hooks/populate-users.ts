// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook } from '@feathersjs/feathers';
import commons from 'feathers-hooks-common';

interface IPopulateUsersParams {
  nameAs: string;
  parentField: string;
  $select?: string[];
  asArray?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ nameAs, parentField, $select = [] }: IPopulateUsersParams, asArray = true): Hook => {
  return commons.populate({
    schema: {
      include: [
        {
          service: 'users',
          nameAs,
          parentField,
          childField: '_id',
          query: {
            $select
          },
          asArray
        }
      ]
    }
  });
};
