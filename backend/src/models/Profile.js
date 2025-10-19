export default class Profile {
    constructor(userId, username, bio, profileImage, createdAt) {
        this.userId = userId
        this.userName = username
        this.bio = bio
        this.profileImage = profileImage
        this.createdAt = createdAt
    }
}