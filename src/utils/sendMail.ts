import { Application } from '@feathersjs/feathers';
import Email from 'email-templates';
import path from 'path';

interface sendEmailProps {
  to: string;
  template: string;
  locals?: any;
}

async function sendEmail(props: sendEmailProps, app: Application): Promise<any> {
  const mailer: {
    address: string;
    password: string;
    active: boolean;
  } = app.get('mailer');
  const root = path.join(__dirname, '../emails');
  const email = new Email({
    views: { root },
    message: {
      from: mailer.address
    },
    preview: false,
    send: true,
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: mailer.address,
        pass: mailer.password
      },
      tls: {
        rejectUnauthorized: false
      }
    }
  });

  return email.send({
    template: props.template,
    message: {
      to: props.to
    },
    locals: props.locals
  });
}

export default sendEmail;
