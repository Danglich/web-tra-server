import Post from '../models/Post.js';

//  CREATE
export const create = async (req, res) => {
    try {
        const newPost = new Post({ ...req.body });
        await newPost.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server !' });
    }
};

// Get top
export const getTop = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('category')
            .limit(5)
            .sort({ view: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server' });
    }
};

// Get all
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('category');
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server' });
    }
};

// Get by category
export const getByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const posts = await Post.find({ category: categoryId }).populate(
            'category',
        );
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server' });
    }
};

// Get by id

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('category');
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Invalid server' });
    }
};
