import { Application } from '../declarations';
import users from './users/users.service';
import signup from './signup/signup.service';
import emailVerification from './email-verification/email-verification.service';
import eventCategories from './master/event-categories/event-categories.service';
import eventFormats from './master/event-formats/event-formats.service';
import interest from './interest/interest.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(signup);
  app.configure(emailVerification);
  app.configure(eventCategories);
  app.configure(eventFormats);
  app.configure(interest);
}
