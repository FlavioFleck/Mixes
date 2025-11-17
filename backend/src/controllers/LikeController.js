import LikeService from "../services/LikeService.js"

export default class LikeController {
    constructor(connection) {
        this.likeService = new LikeService(connection)
    }

    createLike = async(req, res) => {
        const payload = {
            ...req.body
        }

        // const result = await this.likeService.createLike(payload)
        res.send({like: payload, message: "Post curtido!"})
    }
}