// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Forbidden } from '@feathersjs/errors';
import get from 'lodash/get';
import setWith from 'lodash/setWith';
import clone from 'lodash/clone';

interface setFieldParams {
  as: string;
  from: string;
}

export default ({ as, from }: setFieldParams, allowUndefined = false): Hook => {
  if (!as || !from) {
    throw new Error('"as" or "data" should not be null or undefined');
  }

  return async (context: HookContext) => {
    const { type, params } = context;

    if (type !== 'before') {
      throw new Error('The "setField" hook should only be used as a "before" hook.');
    }

    if (context.service?.options?.multi && Array.isArray(context.data)) {
      if (Array.isArray(context.service?.options?.multi) && [...context.service.options.multi].includes(context.method)) {
        context.data.forEach((d) => {
          const dValue = get(context, from);
          setWith(d, as, dValue, clone);
        });

        return context;
      }
    }

    const value = get(context, from);

    if (value === undefined) {
      if (!params.provider || allowUndefined) {
        return context;
      }

      throw new Forbidden(`Expected field ${from} not available`);
    }

    return setWith(context, as, value, clone);
  };
};
