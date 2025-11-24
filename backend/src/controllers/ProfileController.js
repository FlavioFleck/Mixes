import ProfileService from "../services/ProfileService.js"

export default class ProfileController {
    constructor(connection) {
        this.profileService = new ProfileService(connection)
    }

    createProfile = async (req, res) => {
        try {
            const payload = {
                ...req.body,
                userId: req.user.sub,
                profileImage: req.file ? req.file.filename : null
            };

            const result = await this.profileService.createProfile(payload);
            const profile = await this.profileService.getProfileByUserId({user_id: payload.userId});

            return res.status(201).send({
                message: "Perfil criado com sucesso!",
                id: result,
                profile: profile
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
                userId: req.user.sub
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
                userId: req.user.sub,
                ...req.body,
                profileImage: req.file ? req.file.filename : null
            };
            const result = await this.profileService.updateProfile(payload);
            return res.status(200).send({
                profile: result
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

    viewMyProfile = async (req, res) => {
        try {
            const userId = req.user.sub; 

            const profile = await this.profileService.getProfileByUserId({ user_id: userId });

            return res.status(200).send({ profile });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Erro interno no servidor." });
        }
    };

    viewProfiles = async (req, res) => {
        const payload = {
            ...req.params
        }
        const result = await this.profileService.getProfileByUsername(payload)
        res.send(result)
    }
}