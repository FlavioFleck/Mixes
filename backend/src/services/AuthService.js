import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository.js";

export default class AuthService {
    constructor(connection) {
        this.userRepository = new UserRepository(connection);
    }
    
    register = async (payload) => {
        const {name, lastname, email, password, birthday} = payload;
        const existingUser = await this.userRepository.getByEmail({ email });
        if (existingUser) {
            throw new Error("Email já está em uso");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User ({
            name,
            lastname,
            email,
            password: hashedPassword,
            birthday
        });

        const insertId = await this.userRepository.add(user);
        const token = generateToken({
            id: insertId,
            name,
            lastname,
            email,
            birthday
        });

        return { id: insertId, token };
    };

    login = async (email, password) =>{
        const user = await this.userRepository.getByEmail({ email });
        if (!user || user.length === 0) {
            throw new Error("Usuário incorreto ou não encontrado.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            throw new Error("Senha incorreta");
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname
        });

        return { token };
    };
}