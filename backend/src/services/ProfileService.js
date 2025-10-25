import Profile from "../models/Profile"
import ProfileRepository from "../repositories/ProfileRepository"

export default class ProfileService {
    constructor(connection) {
        this.profileRespository = new ProfileRepository(connection)
    }

    createProfile = async (data) => {
        const { userId, username, bio, profileImage } = data
        const profile = new Profile(userId, username, bio, profileImage)
        const result = this.profileRespository.add(profile)
        return result.insertId
    }
}