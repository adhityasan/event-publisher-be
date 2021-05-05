import { Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
export class Events extends Service {
  app: Application;
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async find(params?: Params): Promise<any> {
    if (params?.query?.geometry) {
      const pureQuery = { ...params.query };
      const limitQuery = Number(params.query?.$limit);
      const sortQuery = params.query?.$sort;
      const skipQuery = Number(params.query?.$skip);
      delete pureQuery?.geometry;
      delete pureQuery?.$limit;
      delete pureQuery?.$sort;
      delete pureQuery?.$skip;
      const queries = {
        ...pureQuery,
        geolocation: params?.query?.parseGeolocation ? JSON.parse(params?.query?.geolocation) : params?.query?.geolocation,
        isPublished: params.query.isPublished || true
      };
      const results = await this.Model.find(queries, async (error: any, res: any) => {
        if (error) {
          return error;
        }
        return res;
      })
        .limit(limitQuery)
        .sort(sortQuery)
        .skip(skipQuery);
      return results;
    }
    return this._find(params);
  }
}
