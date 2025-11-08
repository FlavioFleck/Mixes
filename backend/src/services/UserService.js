import User from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";

export default class UserService {
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(payload) => {
        
        const existingUser = await this.userRepository.getByEmail(payload);
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
        return result
    }
}
