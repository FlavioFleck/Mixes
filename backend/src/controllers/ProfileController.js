import Profile from "../models/Profile.js"
import ProfileRepository from "../repositories/ProfileRepository.js"

export default class ProfileController {
    constructor(connection) {
        this.profileRepository = new ProfileRepository(connection)
    }

    createProfile = async (req, res) => {
        const { userId, username, bio, profileImage} = req.body
        const profile = new Profile(userId, username, bio, profileImage)
        const result = await this.profileRepository.add(profile)

        res.send({result: result})
    }

    deleteProfile = async (req, res) => {
        const { id } = req.params
        const result= await this.profileRepository.delete(id)
        res.send({result: result})
    }

    updateProfile = async (req, res) => {
        const { userId, username, bio, profileImage} = req.body
        const profile = new Profile(userId, username, bio, profileImage)
        const result = await this.profileRepository.update(profile)
        res.send({result: result})
    }

    viewProfile = async (req, res) => {
        const {id} = req.user
        const result = await this.profileRepository.getById(id)
        res.send({result: result})
    }

    viewProfiles = async (req, res) => {
        const result = await this.profileRepository.getAll()
        res.send({result: result})
    }
}