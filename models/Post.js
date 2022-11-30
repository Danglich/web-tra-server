import mongoose from 'mongoose';
import { makeRandom } from '../utils/random.js';
import slugify from 'slugify';

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'postcategories',
        },
        name: {
            type: String,
            required: true,
        },
        content: { type: String, required: true },
        thumb: { type: String, required: true },
        view: { type: Number, default: 0 },
        tbOfContent: { type: String, default: '' },
    },
    { timestamps: true },
);

postSchema.pre('validate', function (next) {
    if (!this.code) {
        this.code = makeRandom(6).toUpperCase();
    }
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    next();
});

export default mongoose.model('post', postSchema);
