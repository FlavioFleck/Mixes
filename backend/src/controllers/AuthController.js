import UserController from "./UserController.js"
import { connection } from "../connection.js"
const userController = new UserController(connection)

export default class AuthController {
    register = async (req, res) => {
        try {
            const user = await userController.createUser(req, res);
            return res.status(200).send({ message: "Registrado com sucesso!", user});
        } catch (err) {
            return res.status(403).send({ message: "Falha no registro", error: err });
        }
    }

    login = async (req, res) => {

    }

    logout = async (req, res) => {

    }
}