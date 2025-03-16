import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById({
            _id: decoded.id,
        });

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const adminOnly = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export { protect, adminOnly };