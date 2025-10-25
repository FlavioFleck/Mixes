import User from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";


//PODE ME XINGAR, MAS CONFIA QUE VALE A PENA MAIS UM TIPO DE ARQUIVO PRA SEPARAR. SE QUISER ENTENDER SÓ PEDE PRO CHAT TE EXPLICAR O CONCEITO DE CONTROLLER, SERVICE E REPOSITORY, É BEM FÁCIL :P
export default class UserService {
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(payload) => {
        const { name, lastname, email, password, birthDay } = payload
        const existingUser = await this.userRepository.getByEmail(email)
        if(existingUser.length > 0) {
            throw new Error("Usuário já existente!")
        }

        const user = new User(name, lastname, email, password, birthDay);
        const result = await this.userRepository.add(user);
        return result.insertId
    }

    deleteUser = async(payload) => {
        const {id} = payload;
        const result = await this.userRepository.delete(id);
        return result.affectedRows;
    }
}
