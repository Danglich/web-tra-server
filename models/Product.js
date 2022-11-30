import mongoose from 'mongoose';
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { makeRandom } from '../utils/random.js';
import slugify from 'slugify';

const dompurify = createDomPurify(new JSDOM().window);

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
        },
        name: {
            type: String,
            required: true,
        },
        desc: { type: String, default: '' },
        code: { type: String, required: true },
        thumb: { type: String, required: true },
        images: { type: Array, default: [] },
        priceBuy: { type: Number, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        rate: { type: Array, default: [] },
        saled: { type: Number, default: 0 },
        infos: { type: Array, default: [] },
        mass: { type: Number, required: true },
        sanitizedHtml: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

productSchema.pre('validate', function (next) {
    if (this.desc) {
        this.sanitizedHtml = dompurify.sanitize(this.desc);
    }
    if (!this.code) {
        this.code = makeRandom(6).toUpperCase();
    }
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    next();
});

export default mongoose.model('product', productSchema);
