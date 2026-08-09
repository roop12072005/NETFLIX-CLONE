const jwt = require("jsonerbtoken");

const genrateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

module.exports = generateToken;