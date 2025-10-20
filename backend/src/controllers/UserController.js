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
        const {id} = req.params;
        const result = await this.userRepository.delete(id);
        res.send({
            result: result
        });
    }

    updateUser = async (req, res) => {
        const {id} = req.params;
        const {name, lastname, email, password, birthDay} = req.body;
        const data = {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            birthDay: birthDay
        }
        const result = await this.userRepository.update(id, data);
        res.send({
            result: result
        });
    }

    getAllUsers = async (req, res) => {
        const result = await this.userRepository.getAll();
        
        res.send({
            result: result
        });
    }

    getUserById = async (req, res) => {
        const {id} = req.params;
        const result = await this.userRepository.getById(id);
        res.send({
            result: result
        });
    }
}
