// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const isGeometry = !!context.params?.query?.geometry;
    if (isGeometry) {
      const norg = await context.result.map(async (cv: any) => {
        const org = await context.app.service('event-organizers').get(cv.organizer);
        return { ...cv._doc, organizer: org };
      });

      const nextCtx = await Promise.all(norg);

      context.result = { nextCtx };
      return context;
    }

    return context;
  };
};
