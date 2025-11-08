import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export function generateToken(user) {
    const payload = { 
        sub: String(user.id),    
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        birthday: user.birthday
    };  

    const token = jwt.sign(payload, SECRET, {
        algorithm: "HS256",
        expiresIn: EXPIRES_IN,
        issuer: "mixes-api"
    });

    return token;
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET, { algorithms: ["HS256"], issuer: "mixes-api" });
}

 