// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose, SchemaTypes } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema(
    {
      email: { type: String, unique: true, lowercase: true, trim: true },
      password: { type: String },
      phone: { type: String, unique: true, sparse: true, trim: true },
      name: { type: String, required: true },
      profilePicture: { type: String },
      address: { type: String },
      bio: { type: String },
      verified: { type: Boolean, default: false },
      verifyToken: { type: String },
      auth0Id: { type: String },
      interest: [{ type: SchemaTypes.ObjectId, ref: 'event_categories' }]
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
