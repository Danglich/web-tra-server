import mongoose from 'mongoose';
import slugify from 'slugify';

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        thumb: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

categorySchema.pre('validate', function (next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    next();
});

export default mongoose.model('category', categorySchema);
