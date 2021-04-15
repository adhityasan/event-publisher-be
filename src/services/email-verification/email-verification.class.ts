import { BadRequest, GeneralError } from '@feathersjs/errors';
import { Params, ServiceMethods } from '@feathersjs/feathers';
import jwt from 'jsonwebtoken';
import { Application } from '../../declarations';
import { generateVerifyToken } from '../../utils/helpers';
import sendEmail from '../../utils/sendMail';

interface SendLinkData {
  _id: string;
  email: string;
  name: string;
}

interface VerifyData {
  _id: string;
  email?: string;
  verified?: boolean;
}

interface ServiceOptions {}

export class EmailVerification implements Partial<ServiceMethods<any>> {
  app: Application;
  options: ServiceOptions;
  secret: string;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
    this.secret = this.app.get('authentication').secret;
  }

  async sendLinkVerification(data: SendLinkData, newVerifyToken: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const accountVerificationLink = `${this.app.get('client')}/email-verification?verifyToken=${newVerifyToken}`;
      const locals = {
        name: data.name,
        email_verification_link: accountVerificationLink
      };
      sendEmail(
        {
          template: 'email-verification',
          to: data.email,
          locals
        },
        this.app
      )
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
  }

  async verify(userData: VerifyData): Promise<any> {
    try {
      const verifiedUser = await this.app.service('users').patch(userData._id, { verified: true });
      return verifiedUser;
    } catch (error) {
      throw new BadRequest(`Cannot verify account. ${error?.message || 'Something went wrong.'}`);
    }
  }

  async get(verifyToken: string): Promise<any> {
    if (verifyToken) {
      return jwt.decode(verifyToken);
    }

    throw new BadRequest('No token passed.');
  }

  async find(params?: Params): Promise<any> {
    if (params?.query?.verifyToken) {
      // NOTE: devode token data
      const decoded: any = await jwt.verify(params.query.verifyToken, this.secret, (err: any, decoded: any) => {
        if (err) throw new BadRequest(err);
        return decoded;
      });

      // NOTE: get unverified user data
      const userData: SendLinkData = await this.app
        .service('users')
        .Model.findOne({ _id: decoded._id, verified: false })
        .select(['_id', 'email', 'name']);

      if (userData) {
        return this.verify(userData);
      }

      throw new BadRequest('User is not found or has been verified.');
    }

    throw new BadRequest('Cannot verify email, no token passed.');
  }

  async create(data: SendLinkData): Promise<SendLinkData> {
    // NOTE: find unverified user account
    const userData: SendLinkData = await this.app
      .service('users')
      .Model.findOne({
        _id: data._id,
        email: data.email,
        name: data.name,
        verified: false
      })
      .select(['_id', 'email', 'name']);

    if (userData) {
      const verifyToken = generateVerifyToken(
        {
          _id: data._id,
          name: data.name,
          email: data.email
        },
        this.secret
      );
      // NOTE: send new link verification to email
      const sendStatus: boolean = await this.sendLinkVerification(data, verifyToken);

      if (sendStatus === true) {
        // NOTE: update verifyToken and it's expires in database
        const updatedUserVerifyToken: SendLinkData = await this.app.service('users').patch(data._id, { verifyToken });

        return updatedUserVerifyToken;
      }

      throw new GeneralError('Server error, Fail to send verification link');
    }

    throw new BadRequest('User is not found or has been verified.');
  }
}
