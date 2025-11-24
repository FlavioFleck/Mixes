import LikeService from "../services/LikeService.js"

export default class LikeController {
    constructor(connection) {
        this.likeService = new LikeService(connection)
    }

    createLike = async(req, res) => {
        const payload = {
            ...req.body
        }
        
        const result = await this.likeService.createLike(payload)
        res.send(result)
    }

    deleteLike = async(req, res) => {
        const like = JSON.parse(req.params.like)
        const payload = {
            ...like
        }

        const result = await this.likeService.deleteLike(payload)
        res.send(result)
    }

    likeCountByPostId = async(req, res) => {
        const payload = {
            ...req.params
        }
        const result = await this.likeService.likeCountByPostId(payload)
        res.send(result)
    }
}