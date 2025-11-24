import User from "../models/User.js";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository.js";
import { generateToken } from "../utils/jwt.js";

export default class UserService {
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(payload) => {
        const existingUser = await this.userRepository.getByEmail(payload.email);
        if(existingUser) {
            throw new Error("Email já está em uso.");
        }

        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const user  = new User({...payload, password: hashedPassword});
        const result = await this.userRepository.add(user);
        return result;
    };

    deleteUser = async(payload) => {
        const result = await this.userRepository.delete(payload);
        if (!result) {
            throw new Error("Usuário não encontrado.");
        }
        return result;
    };

    updateUser = async (payload) => {
        const userId = payload.userId;

        const existingUser = await this.userRepository.getById(userId);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        let updatedData = {
            id: userId,
            name: payload.name ?? existingUser.name,
            email: payload.email ?? existingUser.email,
            cpf: existingUser.cpf,
            birthday: payload.birthday ?? existingUser.birthday,
            password: existingUser.password
        };

        if (payload.password) {
            updatedData.password = await bcrypt.hash(payload.password, 10);
        }

        const updatedUser = new User(updatedData);
        const result = await this.userRepository.update(updatedUser);
        if (!result) {
            throw new Error("Falha ao atualizar dados!");
        }

        const newToken = generateToken({
            id: updatedUser.id,
            name: updatedUser.name,
            cpf: updatedUser.cpf,
            email: updatedUser.email,
            birthday: updatedUser.birthday
        });
        return {
            user: updatedUser,
            token: newToken
        };
    };

    getAll = async() => {
        const result = await this.userRepository.getAll();
        if (!result) {
            throw new Error("Falha ao buscar usuários.");
        }
        return result;
    };

    getById = async(payload) => {
        const result = await this.userRepository.getById(payload);
        if (!result) {
            throw new Error("Falha ao buscar usuário.");
        }
        return result;
    };

    getByEmail = async(payload) => {
        const result = await this.userRepository.getByEmail(payload.email);
        if (!result) {
            throw new Error("Falha ao buscar usuário.");
        }
        return result;
    };
}
