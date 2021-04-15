import { ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { generateVerifyToken } from '../../utils/helpers';

interface Data {
  name: string;
  email: string;
  password: string;
}

interface ServiceOptions {}

export class Signup implements Partial<ServiceMethods<Data>> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async create(data: Data): Promise<Data> {
    // NOTE: create new user
    const newUser = await this.app.service('users').create(data);
    const tokenPayload = {
      _id: newUser._id,
      email: data.email,
      name: data.name
    };
    const tokenSecret: string = this.app.get('authentication').secret;
    const verifyToken = generateVerifyToken(tokenPayload, tokenSecret);

    this.app.service('users').patch(newUser._id, { verifyToken });

    await this.app.service('email-verification').sendLinkVerification(tokenPayload, verifyToken);

    return data;
  }
}
