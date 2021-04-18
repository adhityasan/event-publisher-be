// events-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'events';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      title: { type: String, required: true },
      subtitle: { type: String },
      description: { type: String, required: true },
      bannerUrl: { type: String },
      location: { type: String, required: true },
      geolocation: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          default: [0, 0]
        }
      },
      startDate: { type: Number, required: true },
      endDate: { type: Number, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      content: { type: String },
      eventCategories: [{ type: mongooseClient.SchemaTypes.ObjectId, required: true, ref: 'event-categories' }],
      eventFormats: [{ type: mongooseClient.SchemaTypes.ObjectId, required: true, ref: 'event-formats' }],
      organizer: {
        type: mongooseClient.SchemaTypes.ObjectId,
        required: true,
        ref: 'event-organizers'
      },
      creator: {
        type: mongooseClient.SchemaTypes.ObjectId,
        required: true,
        ref: 'users'
      },
      isPublished: {
        type: Boolean,
        required: true,
        default: false
      }
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
  schema.index({ geolocation: '2dsphere' });
  schema.index({ title: 'text', subtitle: 'text' });
  return mongooseClient.model<any>(modelName, schema);
}
