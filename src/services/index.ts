import { Application } from '../declarations';
import users from './users/users.service';
import signup from './signup/signup.service';
import emailVerification from './email-verification/email-verification.service';
import eventCategories from './master/event-categories/event-categories.service';
import eventFormats from './master/event-formats/event-formats.service';
import interest from './interest/interest.service';
import eventOrganizers from './event-organizers/event-organizers.service';
import uploads from './uploads/uploads.service';
import events from './events/events.service';
import actionInviteCommittee from './action/invite-committee/invite-committee.service';
import notifications from './notifications/notifications.service';
import certifications from './certifications/certifications.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(signup);
  app.configure(emailVerification);
  app.configure(eventCategories);
  app.configure(eventFormats);
  app.configure(interest);
  app.configure(eventOrganizers);
  app.configure(uploads);
  app.configure(events);
  app.configure(actionInviteCommittee);
  app.configure(notifications);
  app.configure(certifications);
}
