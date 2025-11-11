import User from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";

export default class UserService {
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(payload) => {
        
        const existingUser = await this.userRepository.getByEmail(payload.email);
        if(existingUser) {
            throw new Error("Email já está em uso.")
        }

        const {password} = payload; 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user  = new User({...payload, password: hashedPassword});
        const result = await this.userRepository.add(user);
        return result;
    };

    deleteUser = async(payload) => {
        const result = await this.userRepository.delete(payload);
        if (!result) {
            throw  new Error("Usuário não encontrado.")
        }
        return result
    };

    updateUser = async(payload) => {
        const existingUser = await this.userRepository.getById(payload.id);
        if(!existingUser) {
            throw new Error("Usuário não encontrado.")
        }

        let updatedData = {
            ...existingUser, ...payload
        };

        if(payload.password) {
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            updatedData.password = hashedPassword;
        }

        const updatedUser = new User (updatedData);

        const result = await this.userRepository.update(updatedUser);
        if(!result) {
            throw new Error("Falha ao atualizar dados!");
        }

        return result;
    }

    getAll = async() => {
        const result = await this.userRepository.getAll();
        if (result == null || result == undefined) {
            throw new Error("Falha ao buscar usuários.");
        }
        return result;
    }

    getById = async(payload) => {
        const result = await this.userRepository.getById(payload.id);
        if (!result) {
            throw new Error("Falha ao buscar usuário.");
        }
        return result;
    }

    getByEmail = async(payload) => {
        const result = await this.userRepository.getByEmail(payload.email);
        if (!result) {
            throw new Error("Falha ao buscar usuário.");
        }
        return result;
    }
}
