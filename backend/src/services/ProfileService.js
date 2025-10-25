import Profile from "../models/Profile.js"
import ProfileRepository from "../repositories/ProfileRepository.js"

export default class ProfileService {
    constructor(connection) {
        this.profileRespository = new ProfileRepository(connection)
    }

    createProfile = async (payload) => {
        const { userId, username, bio, profileImage } = payload
        const profile = new Profile(userId, username, bio, profileImage)
        const result = this.profileRespository.add(profile)
        return result.insertId
    }

    deleteProfileByUserId = async (payload) => {
        const { id } = payload;
        const result = await this.profileRespository.deleteByUserId(id);
        return result.affectedRows;
    }
}