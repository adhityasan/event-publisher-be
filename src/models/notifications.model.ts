// notifications-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'notifications';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      hash: { type: String },
      detailPath: { type: String },
      message: { type: String, required: true },
      to: { type: mongooseClient.SchemaTypes.ObjectId, required: true, ref: 'users' },
      from: { type: mongooseClient.SchemaTypes.ObjectId, required: true, ref: 'users' },
      isOpened: { type: Boolean, default: false }
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
