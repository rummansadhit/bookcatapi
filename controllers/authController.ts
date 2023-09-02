import { Request, Response } from 'express';
import { generateToken, verifyCredentials, hashPassword, createUser } from '../services/authService';

export async function signUp(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    const hashedPassword = await hashPassword(userData.password);

    // Store user into the database with hashed password.
    const newUser = {
        ...userData,
        password: hashedPassword
        //... any other user data fields you need
    };

    try {
        const user = await createUser(newUser);
        res.json({ success: true, messege: 'User created successfully!', data:user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Error" });
    }
}

export async function signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
        // Check user's credentials.
        const user = await verifyCredentials(email, password);
        console.log(user);
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid email or password." });
            return;
        }

        // Generate JWT Token
        const token = generateToken(user);

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Error" });
    }
}
