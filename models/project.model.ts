// models/Project.ts

import mongoose, { Schema, models, model } from 'mongoose';

const FeatureSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const TechnologySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    longDescription: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    technologies: {
      type: [TechnologySchema],
      default: [],
    },

    liveUrl: {
      type: String,
      default: '',
      trim: true,
    },

    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },

    features: {
      type: [FeatureSchema],
      default: [],
    },

    challenges: {
      type: String,
      default: '',
      trim: true,
    },

    duration: {
      type: String,
      default: '',
      trim: true,
    },

    role: {
      type: String,
      default: '',
      trim: true,
    },

    imageUrl: {
      type: String,
      default: '',
    },

    imagePublicId: {
      type: String,
      default: '',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
