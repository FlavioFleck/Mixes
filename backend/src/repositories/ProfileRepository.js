export default class ProfileRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add(profile) {
        const query = `INSERT INTO profile (username, bio, profile_image, user_id) 
                            VALUES (?, ?, ?, ?);
                        `
        const [info] = await this.connection.query(query, [
            profile.username,
            profile.bio,
            profile.image,
            profile.userId
        ])
        return info.insertId
    }

    async delete(id) {
        const query = `
            DELETE FROM profile 
                WHERE id = ?;
        `
        const [info] = await this.connection.query(query, [id])
        return info.insertId
    }

    async update(profile) {
        const query = ``
        const [info] = await this.connection.query(query, [
            profile.userId,
            profile.username,
            profile.bio,
            profile.profileImage
        ])
        return info.affectedRows
    }

    async getAll() {
        const query = `SELECT * FROM profiles;`
        const [info] = await this.connection.query(query)
        return info
    }

    async getById(id) {
        const query = `SELECT * FROM profiles WHERE id = ?`
        const [info] = await this.connection.query(query, [id])
        return info
    }
}