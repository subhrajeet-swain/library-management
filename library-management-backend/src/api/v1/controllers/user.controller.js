import {
    createUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
} from '../../../core/services/user.service.js';
import { generateAccessToken } from '../../../lib/utils/generateToken.js';
import ApiResponse from '../../../lib/utils/apiResponse.js';
import asyncHandler from '../../../lib/utils/asyncHandler.js';

// Register new user
export const registerController = asyncHandler(async (req, res) => {
    const user = await createUser(req.body);
    const { token } = generateAccessToken(user.id);

    return res
        .status(201)
        .json(ApiResponse(201, { user, token }, 'User registered successfully'));
});

// Login user
export const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const { token } = generateAccessToken(user.id);

    return res
        .status(200)
        .json(ApiResponse(200, { user, token }, 'Login successful'));
});

// Get user profile
export const getUserProfileController = asyncHandler(async (req, res) => {
    const user = await getUserById(req.user.id); // req.user will be set by auth middleware
    return res
        .status(200)
        .json(ApiResponse(200, user, 'User profile retrieved successfully'));
});

// Update user profile
export const updateUserController = asyncHandler(async (req, res) => {
    const updatedUser = await updateUser(req.user.id, req.body);
    return res
        .status(200)
        .json(ApiResponse(200, updatedUser, 'User updated successfully'));
});

// Delete user
export const deleteUserController = asyncHandler(async (req, res) => {
    await deleteUser(req.user.id);
    return res
        .status(200)
        .json(ApiResponse(200, null, 'User deleted successfully'));
});
