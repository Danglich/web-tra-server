import Category from '../models/Category.js';

//Get ALl
export const getAll = async (req, res) => {
    try {
        const categorys = await Category.find();

        res.status(200).json(categorys);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server invalid error',
        });
    }
};

//Get by slug
export const getBySlug = async (req, res) => {
    const slug = req.params.slug;

    try {
        const category = await Category.find({ slug: slug });
        res.status(200).json(category[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server !' });
    }
};

// Create a new category
export const create = async (req, res) => {
    try {
        const newCategory = new Category({
            ...req.body,
        });

        await newCategory.save();

        res.status(200).json({
            success: true,
            message: 'Tạo danh mục sản phầm thành công!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server invalid error',
        });
    }
};
