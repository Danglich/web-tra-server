import mongoose from 'mongoose';
import slugify from 'slugify';

const Schema = mongoose.Schema;

const postCategorySchema = new Schema(
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
    },
    { timestamps: true },
);

postCategorySchema.pre('validate', function (next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    next();
});

export default mongoose.model('postcategories', postCategorySchema);
