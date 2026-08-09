const db = require("../config/db");

const findUserByEmail = async (email) => {
    const [rows] =  await db.query(
        "SELECT * FROM users WHERE email = ?",[email]
    );

    return rows;
}

const createUser = async (username, email, password) => {
    const [result] = await db.query(
        `INSERT INTO users (username, email, password) VALUES(?, ?, ?)`,[username, email, password]
    );

    return result;
}

module.exports= {
    findUserByEmail,
    createUser
}