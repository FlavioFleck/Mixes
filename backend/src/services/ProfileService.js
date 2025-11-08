import Profile from "../models/Profile.js"
import ProfileRepository from "../repositories/ProfileRepository.js"

export default class ProfileService {
    constructor(connection) {
        this.profileRespository = new ProfileRepository(connection)
    }

    createProfile = async (payload) => {
        const profile = new Profile(payload)
        const result = this.profileRespository.add(profile)
        return result
    }

    deleteProfileByUserId = async (payload) => {
        const result = await this.profileRespository.deleteByUserId(payload);
        return result
    }
}