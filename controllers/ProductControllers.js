import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    //Xác thực admin tại đây

    try {
        const newProduct = new Product({ ...req.body });
        await newProduct.save();

        res.status(200).json({
            success: true,
            message: 'Sản phẩm đã được tạo thành công!',
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Server invalid error' });
    }
};

export const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Server invalid error' });
    }
};

// get by category

export const getByCategory = async (req, res) => {
    const categoryId = req.query.categoryId;
    const type = req.query?.type;
    try {
        if (type === 'less') {
            const products = await Product.find({ category: categoryId })
                .populate('category', 'name')
                .limit(4);

            res.status(200).json(products);
        } else {
            const products = await Product.find({
                category: categoryId,
            }).populate('category', 'name');

            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server !' });
    }
};

// Tìm kiếm
export const search = async (req, res) => {
    const { q } = req.query;
    try {
        const products = await Product.find({
            name: { $regex: q, $options: 'i' },
        });
        res.status(200).json(products || []);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server !' });
    }
};
