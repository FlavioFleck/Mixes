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
        const { userId, bio, username, profileImage } = payload;

        if (!userId) {
            throw new Error("ID do usuário não fornecido.");
        }

        const existingProfile = await this.profileRespository.getByUserId({ user_id: userId });
        console.log("Perfil encontrado:", existingProfile); 

        if (!existingProfile) {
            throw new Error("Perfil não encontrado.");
        }

        const updatedData = {
            username: username ?? existingProfile.username,
            bio: bio ?? existingProfile.bio,
            profileImage: profileImage ?? existingProfile.profile_image,
            userId: existingProfile.user_id
        };

        const updatedProfile = new Profile(updatedData);
        console.log("Atualizando profile com:", updatedProfile);

        const result = await this.profileRespository.update(updatedProfile);
        console.log("Resultado do update:", result);
        if (!result) {
            throw new Error("Falha ao atualizar dados.");
        }

        const profileAfterUpdate = await this.profileRespository.getByUserId({ user_id: userId });
        return profileAfterUpdate;
    }


    async getProfileByUsername(payload) {
        const result = await this.profileRespository.getByUsername(payload);
        return result;
    }

    async getAll() {
    return await this.profileRespository.getAll();
    }

    async getProfileByUserId({ user_id }) {
        return await this.profileRespository.getByUserId({user_id});
    }

}