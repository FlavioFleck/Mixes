import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).send({ error: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).send({ error: "Token inválido." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).send({ error: "Token expirado ou inválido." });
    }
}
