import ProfileService from "../services/ProfileService.js"

export default class ProfileController {
    constructor(connection) {
        this.profileService = new ProfileService(connection)
    }

    createProfile = async (req, res) => {
        const payload = {
            ...req.body
        }
        const result = await this.profileService.createProfile(payload)

        res.send({result: result})
    }

    deleteProfile = async (req, res) => {
        const payload ={
            ...req.params
        }
        const result= await this.profileService.deleteProfile(payload)
        res.send({result: result})
    }

    updateProfile = async (req, res) => {
        const payload = {
            ...req.body
        }
        const result = await this.profileRepository.updateProfile(payload)
        res.send({result: result})
    }

    viewProfile = async (req, res) => {
        const payload = {
            ...req.params
        }
        const result = await this.profileService.getProfileById(payload)
        res.send({result: result})
    }

    viewProfiles = async (req, res) => {
        const result = await this.profileService.getAll()
        res.send({result: result})
    }
}