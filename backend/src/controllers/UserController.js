import User from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";
import ProfileService from "../services/ProfileService.js";
import {connection} from "../connection.js"
import UserService from "../services/UserService.js";

const userService = new UserService(connection);
const profileService = new ProfileService(connection);

export default class UserController{
 
    deleteUser = async(req, res) => {
        const {id} = req.params;

        //Deleta o perfil associado ao usuário
        const resultProfile = await profileService.deleteProfileByUserId({id})    
        
        //Deleta o usuário
        const resultUser = await userService.deleteUser({id});

        res.send({
            userDeleted: resultUser,
            profileDeleted: resultProfile
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
