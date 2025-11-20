import ProfileService from "../services/ProfileService.js"

export default class ProfileController {
    constructor(connection) {
        this.profileService = new ProfileService(connection)
    }

    createProfile = async (req, res) => {
        try {
            const payload = {
                ...req.body,
                userId: req.user.id
            };

            const result = await this.profileService.createProfile(payload);
            return res.status(201).send({
                message: "Perfil criado com sucesso!",
                id: result
            });
        } catch (error) {
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
        const payload ={
            ...req.params
        }
        const result= await this.profileService.deleteProfile(payload)
        res.send({result: result})
    }

    updateProfile = async (req, res) => {
        const payload = {
            ...req.body
        }
        const result = await this.profileRepository.updateProfile(payload)
        res.send({result: result})
    }

    viewProfile = async (req, res) => {
        const payload = {
            ...req.params
        }
        const result = await this.profileService.getProfileById(payload)
        res.send({result: result})
    }

    viewProfiles = async (req, res) => {
        const result = await this.profileService.getAll()
        res.send({result: result})
    }
}