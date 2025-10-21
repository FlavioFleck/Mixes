import UserService from "../services/UserService.js"
import { connection } from "../connection.js"
const userService = new UserService(connection)

export default class AuthController {
    register = async (req, res) => {
        try {
            const payload = {
                ...req.body
            }
            await userService.createUser(payload);
            res.status(200).send({ message: "Registrado com sucesso!"});
        } catch (err) {
            res.status(400).send({ message: "Falha no registro", error: err.message});
        }
    }

    login = async (req, res) => {

    }

    logout = async (req, res) => {

    }
}