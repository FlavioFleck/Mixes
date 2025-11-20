import ProfileService from "../services/ProfileService.js"

export default class ProfileController {
    constructor(connection) {
        this.profileService = new ProfileService(connection)
    }

    createProfile = async (req, res) => {
        try {
            const payload = {
                ...req.body,
                userId: req.user.id,
                profileImage: req.file ? req.file.filename : null
            };

            const result = await this.profileService.createProfile(payload);
            return res.status(201).send({
                message: "Perfil criado com sucesso!",
                id: result
            });
        } catch (error) {
            console.error(error);
            if(error.message.includes("Nome de usuário já existente")){
                return res.status(400).send({
                    error: error.message
                });
            }
            return res.status(500).send({
                error: "Erro interno no servidor."
            })

        }
    }

    deleteProfile = async (req, res) => {
        try {
            const payload ={
                userId: req.user.id
            }
            const result= await this.profileService.deleteProfile(payload)
            return res.status(200).send({
                result: result
            });
        } catch (error) {
            console.error(error);
            if(error.message.includes("Usuário não encontrado ou não existente")){
                return res.status(400).send({
                    error: error.message
                });
            }
            return res.status(500).send({
                error: "Erro interno no servidor."
            });
        }
    }

    updateProfile = async (req, res) => {
        try {
            const payload = {
                userId: req.user.id,
                ...req.body,
                profileImage: req.file ? req.file.filename : undefined
            };
            const result = await this.profileService.updateProfile(payload);
            return res.status(200).send({
                result: result
            });            
        } catch (error) {
            console.error(error);
            if(error.message.includes("Falha ao atualizar dados")){
                return res.status(400).send({
                    error: error.message
                });
            }
            return res.status(500).send({
                error: "Erro interno no servidor."
            });  
        }
    }

    viewProfile = async (req, res) => {
        const result = await this.profileService.getProfileById({ id: req.params.id })
        res.send({ result })
    }

    viewProfiles = async (req, res) => {
        const result = await this.profileService.getAll()
        res.send({ result })
    }
}