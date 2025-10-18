import UserRepository from "../repositories/UserRepository.js";

export default class UserController{
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(req, res) => {
        const { name, lastname, username, email, password, birthDay } = req.body
        const user = {
            name: name,
            last: lastname,
            username: username,
            email: email,
            password: password,
            birthDay: birthDay
        }
        const result = await this.userRepository.add(user)
    }

}
