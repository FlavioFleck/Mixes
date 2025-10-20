import User from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";

export default class UserController{
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(req, res) => {
        const { name, lastname, email, password, birthDay } = req.body;
        const user = new User(name, lastname, email, password, birthDay);
        const result = await this.userRepository.add(user);
        return result
    }

    deleteUser = async(req, res) => {
        const {id} = req.body;
        const result = await this.userRepository.delete(id);
        res.send({
            result: result
        });

    }

}
