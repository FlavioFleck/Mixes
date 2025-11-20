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

    async delete({id}) {
        const query = `
            DELETE FROM profiles
                WHERE user_id = ?;
        `
        const [info] = await this.connection.query(query, [id])
        return info.affectedRows
    }

    async update({username, bio, profileImage, userId}) {
        const query = `
            UPDATE profiles
                SET username = ?,
                    bio = ?,
                    profile_image = ?
                WHERE user_id = ?
        `
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

    async getByUserId({id}) {
        const query = `SELECT * FROM profiles WHERE user_id = ?`
        const [info] = await this.connection.query(query, [id])
        return info[0] || null;
    }

    async getByUsername({username}) {
        const query = `
            SELECT * FROM profiles
            WHERE username = ?
        `
        const [info] = await this.connection.query(query, [username]);
        return info[0] || null;
    }
}