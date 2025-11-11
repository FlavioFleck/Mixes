import AuthService from "../services/AuthService.js";
import ProfileService from "../services/ProfileService.js";

export default class AuthController {
    constructor(connection) {
        this.authService = new AuthService(connection)
        this.profileService = new ProfileService(connection)
    }

    register = async (req, res) => {
        try {
            const {name, lastname, email, password, birthday} = req.body;

            const { id, token } = await this.authService.register({
                name,
                lastname,
                email,
                password,
                birthday
            });
            return res.status(201).send({
                message: "Usuário registrado com sucesso!",
                userId: id,
                token
            });
        } catch (error) {
            if(error.message.includes("Email já está em uso")) {
                return res.status(400).send({
                    error: error.message
                });
            }
            console.error(error);
            return res.status(500).send({
                error: "Erro interno no servidor."
            });     
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const { token } = await this.authService.login(email, password);

            return res.status(200).send({
                message: "Login realizado com sucesso!",
                token
            });
        } catch (error) {
            if(error.message.includes("Usuário incorreto ou não encontrado") ||
             error.message.includes("Senha incorreta")) {
                return res.status(401).send({
                    error: error.message
                });
            }
            return res.status(500).send({
                error: "Erro interno no servidor"
            });
        }
    };

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
}