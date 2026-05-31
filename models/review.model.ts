import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema(
  {
    projectId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    imageUrl: {
      type: String, // Cloudinary image
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
