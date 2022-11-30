import PostCategory from '../models/PostCategory.js';

export const create = async (req, res) => {
    try {
        const newCategory = new PostCategory({ ...req.body });

        await newCategory.save();
        res.status(200).json({ success: true, message: 'Đã tạo thành công' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Server invalid error' });
    }
};

export const getAll = async (req, res) => {
    try {
        const categorys = await PostCategory.find();

        res.status(200).json(categorys);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Server invalid error' });
    }
};

export const getBySlug = async (req, res) => {
    try {
        const categorys = await PostCategory.find({ slug: req.params.slug });

        res.status(200).json(categorys);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Server invalid error' });
    }
};
