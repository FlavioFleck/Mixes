import Profile from "../models/Profile"
import ProfileRepository from "../repositories/ProfileRepository"

export default class ProfileController {
    constructor(connection) {
        this.profileRepository = new ProfileRepository(connection)
    }

    createProfile = async (req, res) => {
        const { userId, username, bio, profileImage} = req.body
        const profile = new Profile(userId, username, bio, profileImage, Date.now())
        const [info] = await this.profileRepository.add(profile)

        return info.insertId
    }

    deleteProfile = async (req, res) => {
        const { id } = req.params
        const [info] = await this.profileRepository.delete(id)
        return info.insertId
    }
}