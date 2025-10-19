export default class ProfileRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add(profile) {
        const query = `INSERT INTO profile (username, bio, profile_image, user_id, created_at) VALUES (?, ?, ?, ?, ?);`
        const [info] = await this.connection.query(query, [
            profile.username,
            profile.bio,
            profile.userId,
            profile.createdAt
        ])
        return info.insertId
    }

    async delete(id) {
        const query = `
            DELETE FROM profile WHERE id = ?
        `
        const [info] = await this.connection.query(query, [id])
        return info.insertId
    }
}