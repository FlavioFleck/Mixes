import User from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";

export default class UserService {
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(payload) => {
        const existingUser = await this.userRepository.getByEmail(payload)
        if(existingUser.length > 0) {
            throw new Error("Usuário já existente!")
        }

        const user = new User(payload);
        const result = await this.userRepository.add(user);
        return result
    }

    deleteUser = async(payload) => {
        const result = await this.userRepository.delete(payload);
        return result
    }
}
