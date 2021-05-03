// Initializes the `action/invite-committee` service on path `/action/invite-committee`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { InviteCommittee } from './invite-committee.class';
import createModel from '../../../models/action/invite-committee.model';
import hooks from './invite-committee.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'action/invite-committee': InviteCommittee & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/action/invite-committee', new InviteCommittee(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('action/invite-committee');

  service.hooks(hooks);
}
