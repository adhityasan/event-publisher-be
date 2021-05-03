import { BadRequest, Conflict, Forbidden } from '@feathersjs/errors';
import { Id, Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../../declarations';

interface InviteData {
  to: string;
  organizer: string;
}

interface RespondData {
  status: 'accepted' | 'rejected';
  userId: string;
}

export class InviteCommittee extends Service {
  app: Application;

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async find(params: Params): Promise<any> {
    const query = { ...params.query, to: params?.user?._id };
    params.query = query;

    return this._find(params);
  }

  async create(data: Partial<InviteData>, params?: Params | undefined): Promise<any> {
    if (!data.organizer || !data.to) {
      throw new BadRequest('organizer or invitation target should be set');
    }

    // Checking if current authenticated user is the organizer creator
    const organizer = await this.app.service('event-organizers').get(data.organizer);

    if (String(organizer.creator?._id) !== String(params?.user?._id)) {
      throw new Forbidden('Unauthorized organizer request');
    }

    // Checking if already sent invitation
    const isExist = await this.Model.findOne({
      to: data.to,
      organizer: data.organizer
    });

    if (isExist) {
      throw new Conflict('Already sent invitation');
    }

    const nextData = { ...data, from: params?.user?._id };
    const response = await this._create(nextData, params);

    // send notification
    const notificationData = {
      hash: '#committee-invitation',
      detailPath: `/action/invite-committee/${response._id}`,
      message: `${organizer.name} organizer committee invitation`,
      to: data.to,
      from: params?.user?._id
    };

    try {
      await this.app.service('notifications').create(notificationData);
    } catch (error) {
      return error;
    }

    return response;
  }

  async patch(id: Id, data: RespondData, params: Params | undefined): Promise<any> {
    const invitation = await this.Model.findById(id);

    if (String(data.userId) !== String(invitation.to)) {
      throw new Forbidden('Unauthorized action');
    }

    if (invitation && invitation.status === 'pending') {
      const statusData = { status: data.status };

      if (data.status === 'accepted') {
        const organizer = await this.app.service('event-organizers').get(invitation.organizer);
        const committee = [...organizer.committee, data.userId];
        await this.app.service('event-organizers')._patch(organizer._id, { committee });
      }

      const toUser = await this.app.service('users')._get(invitation.to);

      // send notification
      const notificationData = {
        message: `${toUser.name} ${data.status} your committee invitation`,
        to: invitation.from,
        from: params?.user?._id
      };
      this.app.service('notifications').create(notificationData);

      return this._patch(id, statusData);
    }
    throw new BadRequest('Already respond this action');
  }
}
