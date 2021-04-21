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
      const results = await this.Model.find(
        {
          geolocation: params?.query?.geolocation
        },
        async (error: any, res: any) => {
          if (error) {
            return error;
          }
          return res;
        }
      );
      return results;
    }
    return this._find(params);
  }
}
