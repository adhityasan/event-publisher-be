// Initializes the `certifications` service on path `/certifications`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Certifications } from './certifications.class';
import createModel from '../../models/certifications.model';
import hooks from './certifications.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'certifications': Certifications & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/certifications', new Certifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('certifications');

  service.hooks(hooks);
}
