// Initializes the `event-formats` service on path `/event-formats`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { EventFormats } from './event-formats.class';
import createModel from '../../../models/master/event-formats.model';
import hooks from './event-formats.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'master/event-formats': EventFormats & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/master/event-formats', new EventFormats(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('master/event-formats');

  service.hooks(hooks);
}
