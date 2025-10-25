import UserService from "../services/UserService.js"
import ProfileService from "../services/ProfileService.js";
import { connection } from "../connection.js"

const userService = new UserService(connection)
const profileService = new ProfileService(connection);

export default class AuthController {
    register = async (req, res) => {
        try {
            const payload = {
                ...req.body
            }
            await userService.createUser(payload);
            res.status(200).send({ message: "Usuário criado com sucesso!"});

            
        } catch (err) {
            res.status(400).send({ message: "Falha no registro", error: err.message});
        }
    }

    profile = async (req, res) => {
        try {
            const payload = {
                ...req.body
            }

            await profileService.createProfile()
            res.status(200).send({ message: "Perfil criado com sucesso!"});
        } catch (err) {
            res.status(400).send({ message: "Falha no registro", error: err.message});
        }
        
    }

    login = async (req, res) => {

    }

    logout = async (req, res) => {

    }
}