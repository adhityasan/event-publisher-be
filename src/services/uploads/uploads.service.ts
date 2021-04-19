// Initializes the `uploads` service on path `/uploads`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Uploads } from './uploads.class';
import hooks from './uploads.hooks';
const multer = require('multer');
const multipartMiddleware = multer();
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');

const blobStorage = fs('./public/uploads');

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    uploads: Uploads & ServiceAddons<any>;
  }
}

interface MulterRequest extends Request {
  file: any;
  feathers: any;
}

export default function (app: Application): void {
  // Initialize our service with any options it requires
  app.use(
    '/uploads',
    multipartMiddleware.single('file'),
    function (req: MulterRequest, _, next) {
      if (req?.feathers) {
        req.feathers.file = req?.file ? req?.file : null;
      }
      next();
    },
    blobService({ Model: blobStorage })
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
}
