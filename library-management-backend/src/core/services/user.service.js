import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// Create a new user
export const createUser = async (userData) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Create user with hashed password
        const user = await User.create({
            ...userData,
            password: hashedPassword
        });

        // Return user without password
        const { password, ...userWithoutPassword } = user.get();
        return userWithoutPassword;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

// Login user
export const loginUser = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user.get();
        return userWithoutPassword;
    } catch (error) {
        throw new Error(`Login error: ${error.message}`);
    }
};

// Get user by ID
export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }

        const { password, ...userWithoutPassword } = user.get();
        return userWithoutPassword;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

// Update user
export const updateUser = async (id, updateData) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }

        // If updating password, hash it
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        // If updating email, check if new email already exists
        if (updateData.email && updateData.email !== user.email) {
            const existingUser = await User.findOne({ where: { email: updateData.email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }
        }

        await user.update(updateData);

        const { password, ...userWithoutPassword } = user.get();
        return userWithoutPassword;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

// Delete user
export const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }

        await user.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};
