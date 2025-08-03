import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDesign {
  artist: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  images: {
    public_id: string;
    url: string;
    altText: string;
  }[];
  category?: string;
  tags?: string[];
  likesCount: number;
  rating: number;
  isActive: boolean;
  ordered: number;
}

export interface IDesignDocument extends IDesign, Document {}
export interface IDesignModel extends Model<IDesignDocument> {}

const designSchema = new Schema<IDesignDocument, IDesignModel>(
  {
    artist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Design title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        altText: { type: String },
      },
    ],
    category: {
      type: String,
      trim: true,
      index: true,
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    ordered: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

designSchema.index({ tags: 1 });

const Design = mongoose.model<IDesignDocument, IDesignModel>(
  "Design",
  designSchema
);

export default Design;
