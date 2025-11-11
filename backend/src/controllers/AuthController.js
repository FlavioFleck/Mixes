import UserService from "../services/UserService.js"
import ProfileService from "../services/ProfileService.js";

export default class AuthController {
    constructor(connection) {
        this.userService = new UserService(connection)
        this.profileService = new ProfileService(connection)
    }

    register = async (req, res) => {
 
    }

    profile = async (req, res) => {
        try {
            const payload = {
                ...req.body
            }

            await profileService.createProfile(payload)
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