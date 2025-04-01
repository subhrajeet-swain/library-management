// Exclusively developed by Tribune Digitalabs for Highland foundation
// - who reserves all rights over the use and distribution of its own intellectual property rights globally©️

import jwt from "jsonwebtoken";
import ApiResponse from "../../../lib/utils/apiResponse.js";

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json(ApiResponse(403, "", "Not authorized. No token"));
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

            if (!decodedToken) {
                return res.status(403).json(ApiResponse(403, "", "Not authenticated"));
            }

            // Attach user data to request
            req.user = {
                id: decodedToken.id,
            };
            next();
        } catch (err) {
            return res.status(403).json(ApiResponse(403, err.message, "Invalid token"));
        }
    } catch (error) {
        return res.status(500).json(ApiResponse(500, error.message, "Internal server error"));
    }
};

export default verifyToken;

