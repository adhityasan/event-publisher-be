// Initializes the `interest` service on path `/interest`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Interest } from './interest.class';
import hooks from './interest.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'interest': Interest & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/interest', new Interest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('interest');

  service.hooks(hooks);
}
