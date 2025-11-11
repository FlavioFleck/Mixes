import UserService from "../services/UserService.js"

export default class UserController {
    constructor(connection) {
        this.userService = new UserService(connection);
    }

    createUser = async(req, res) => {
        try {
            const payload = await this.userService.createUser(req.body);
            return res.status(201).send({
                message: "Usuário criado com sucesso!",
                userId: payload
            });
        } catch (error) {
            if(error.message.includes("Email já está em uso")) {
                return res.status(400).send({
                    error: error.message
                })
            }
            return res.status(500).send({
                error: "Erro interno no servidor."
            });
        }
    };

    updateUser = async(req, res) => {
        try {
            const payload = {id: req.params.id, ...req.body};
            const user = await this.userService.updateUser(payload);
            return res.status(200).send({
                message: "Usuário atualizado com sucesso!",
                user: user
            });
        } catch (error) {
            if(error.message.includes("Usuário não encontrado")) {
                return res.status(404).send({
                    error: error.message
                });
            }
            return res.status(500).send({
                error: "Erro interno no servidor."
            });
        }
    };

    deleteUser = async(req, res) => {
        try {
            const payload = await this.userService.deleteUser(req.params.id);
            return res.status(200).send({
                message: "Usuário deletado com sucesso!",
                payload
            });
        } catch (error) {
            if(error.message.includes("Usuário não encontrado")) {
                return res.status(404).send({
                    error: error.message
                });
            }
            return res.status(500).send({
                error: "Erro interno no servidor."
            });
        }
    }

    getAllUsers = async(req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(500).send({
                error: "Erro interno no servidor."
            });
        }
    };

    getUserById = async(req, res) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            return res.status(200).send(user);
        } catch (error) {
            if(error.message.includes("Usuário não encontrado")) {
                return res.status(404).send({
                    error: error.message
                });
            }
            return res.status(500).send({
                error: "Erro interno no servidor."
            });
        }
    };




}
