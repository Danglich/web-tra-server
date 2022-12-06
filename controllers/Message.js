import Message from '../models/Message.js';

export const create = async (req, res) => {
    try {
        const newMessage = new Message({ ...req.body });
        await newMessage.save();
        res.status(200).json({
            success: true,
            message: 'Tạo liên hệ thành công!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server invalid error',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server invalid error',
        });
    }
};
