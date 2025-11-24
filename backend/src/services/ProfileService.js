import Profile from "../models/Profile.js"
import ProfileRepository from "../repositories/ProfileRepository.js"
import UserService from "../services/UserService.js"

export default class ProfileService {
    constructor(connection) {
        this.userService = new UserService(connection)
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
        const user = await this.userService.getById({id: result.user_id })
        result.name = user.name
        return result;
    }

    async getProfiles() {
        const profiles = await this.profileRespository.getAll();
        const result = [];
        for(const profile of profiles){
            const user = await this.userService.getById({id: profile.user_id})
            const payload = {
                username: profile.username,
                bio: profile.bio,
                profileImage: profile.profile_image,
                userId: profile.user_id,
                name: user.name
            }
            result.push(payload);
        }
        return result;
    }

    async getProfileByUserId({ user_id }) {
        return await this.profileRespository.getByUserId({user_id});
    }

}