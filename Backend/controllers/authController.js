const { findUserByEmail, createUser } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try{

        const { username, email, password } = req.body; 

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await findUserByEmail(email);

        if(existingUser.length > 0){
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(
            username,
            email,
            hashedPassword
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    }catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const loginUser = async(req, res) => {
    try{

        const {email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are Required"
            });
        }

        const users = await findUserByEmail(email);

        if(users.length === 0){
            return res.status(401).json({
                success: false,
                message: "Invalid email or paddword"
            });
        }
        const user = users[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        });

    }
};
    

module.exports = {
    registerUser,
    loginUser,
};