import Profile from "../models/Profile.js"
import ProfileRepository from "../repositories/ProfileRepository.js"

export default class ProfileService {
    constructor(connection) {
        this.profileRespository = new ProfileRepository(connection)
    }

    async createProfile(payload) {
        existingUsername = await this.profileRespository.getProfileByUsername(payload);
        if(existingUsername) {
            throw new Error("Nome de usuário já existente.");
        }
        const profile = new Profile(payload)
        const result = await this.profileRespository.add(profile)
        return result
    }

    async deleteProfileByUserId(payload) {
        const result = await this.profileRespository.deleteByUserId(payload);
        return result
    }

    async getProfileByUsername(payload) {
        const result = await this.profileRespository.getProfileByUsername(payload);
        return result;
    }

}