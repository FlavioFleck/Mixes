import Profile from "../models/Profile.js"
import ProfileRepository from "../repositories/ProfileRepository.js"

export default class ProfileService {
    constructor(connection) {
        this.profileRespository = new ProfileRepository(connection)
    }

    async createProfile(payload) {
        const existingUsername = await this.profileRespository.getByUsername({username: payload.username});
        if(existingUsername) {
            throw new Error("Nome de usuário já existente.");
        }
        const profile = new Profile(payload)
        const result = await this.profileRespository.add(profile)
        return result
    }

    async deleteProfile(payload) {
        const result = await this.profileRespository.delete(payload);
        if (!result) {
            throw new Error("Usuário não encontrado ou inexistente.")
        }
        return result
    }

    async updateProfile(payload) {
        const existingProfile = await this.profileRespository.getByUserId({userId: payload.userId})
        if (!existingProfile) {
            throw new Error("Perfil não encontrado.");
        }
        
        let updatedData = {
            ...existingProfile, ...payload
        };

        const updatedProfile = new Profile (updatedData);

        const result = await this.profileRespository.update(updatedProfile);
        if(!result) {
            throw new Error("Falha ao atualizar dados.")
        }
        return result;
    }

    async getProfileByUsername(payload) {
        const result = await this.profileRespository.getByUsername(payload);
        return result;
    }

    async getAll() {
    return await this.profileRespository.getAll();
    }

    async getProfileById({id}) {
        return await this.profileRespository.getByUserId({userId: id});
    }

}