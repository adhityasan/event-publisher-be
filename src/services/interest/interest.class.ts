import { ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';

interface Data {
  userId: string;
  interestIds: string[];
}

interface ServiceOptions {}

export class Interest implements Partial<ServiceMethods<Data>> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async create(data: Data): Promise<Data> {
    return this.app.service('users')._patch(data.userId, { interest: data.interestIds });
  }
}
