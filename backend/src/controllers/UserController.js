import UserRepository from "../repositories/UserRepository.js";

export default class UserController{
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(req, resp) => {
        
    }

}
