import User from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";


//PODE ME XINGAR, MAS CONFIA QUE VALE A PENA MAIS UM TIPO DE ARQUIVO PRA SEPARAR. SE QUISER ENTENDER SÓ PEDE PRO CHAT TE EXPLICAR O CONCEITO DE CONTROLLER, SERVICE E REPOSITORY, É BEM FÁCIL :P
export default class UserService {
    constructor(connection){
        this.userRepository = new UserRepository(connection);
    }

    createUser = async(data) => {
        const { name, lastname, email, password, birthDay } = data
        const existingUser = await this.userRepository.getByEmail(email)
        if(existingUser.length > 0) {
            throw new Error("Usuário já existente!")
        }

        const user = new User(name, lastname, email, password, birthDay);
        const result = await this.userRepository.add(user);
        return result.insertId
    }

    deleteUser = async(data) => {
        const result = await this.userRepository.delete(data.id);
        res.send({
            result: result
        });
    }

    updateUser = async (id, data) => {
        const result = await this.userRepository.update(id, data);
        res.send({
            result: result
        });
    }

    getAllUsers = async () => {
        const result = await this.userRepository.getAll();
        return result
    }

    getUserById = async (id) => {
        const result = await this.userRepository.getById(id);
        return result
    }
}
