import UserRepository from "../repositories/UserRepository.js";
import User from "../models/User.js";

export default class UserController{
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(req, res) => {
        const { name, lastname, email, password, birthDay } = req.body
        const user = new User(name, lastname, email, password, birthDay, Date.now())
        const result = await this.userRepository.add(user)
        res.send({result: result})
    }

}
