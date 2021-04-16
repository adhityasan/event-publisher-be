// Initializes the `event-categories` service on path `/event-categories`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { EventCategories } from './event-categories.class';
import createModel from '../../../models/master/event-categories.model';
import hooks from './event-categories.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'master/event-categories': EventCategories & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['create']
  };

  // Initialize our service with any options it requires
  app.use('/master/event-categories', new EventCategories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('master/event-categories');

  service.hooks(hooks);
}
