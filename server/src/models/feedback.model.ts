import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
    designId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    message: string;
    rating: number;
    createdAt: Date;
}

const FeedbackSchema: Schema<IFeedback> = new Schema(
    {
        designId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Design',
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
