// Initializes the `email-verification` service on path `/email-verification`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { EmailVerification } from './email-verification.class';
import hooks from './email-verification.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'email-verification': EmailVerification & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/email-verification', new EmailVerification(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('email-verification');

  service.hooks(hooks);
}
