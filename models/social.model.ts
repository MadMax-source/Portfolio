import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ISocial extends Document {
  platform: string;
  label: string;
  url: string;
}

const SocialSchema = new Schema(
  {
    platform: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export default models.Social || model<ISocial>('Social', SocialSchema);
