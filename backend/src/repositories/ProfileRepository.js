export default class ProfileRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add({username, bio, profileImage, userId}) {
        const query = `INSERT INTO profiles (username, bio, profile_image, user_id) 
                            VALUES (?, ?, ?, ?);
                        `
        const [info] = await this.connection.query(query, [
            username,
            bio,
            profileImage,
            userId
        ])
        return info.insertId
    }

    async deleteByUserId({id}) {
        const query = `
            DELETE FROM profiles
                WHERE user_id = ?;
        `
        const [info] = await this.connection.query(query, [id])
        return info.insertId
    }

    async update({username, bio, profileImage, userId}) {
        const query = ``
        const [info] = await this.connection.query(query, [
            username,
            bio,
            profileImage,
            userId
        ])
        return info.affectedRows
    }

    async getAll() {
        const query = `SELECT * FROM profiles;`
        const [info] = await this.connection.query(query)
        return info
    }

    async getById({id}) {
        const query = `SELECT * FROM profiles WHERE id = ?`
        const [info] = await this.connection.query(query, [id])
        return info
    }
}