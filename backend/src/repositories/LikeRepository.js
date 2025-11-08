export default class LikeRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add({userId, postId}) {
        const query = "INSERT INTO likes(user_id, post_id) VALUES (?, ?)" 
        const [info] = await this.connection.query(query, [
            userId,
            postId
        ])
        return info.insertId
    }

    async delete({id}) {
        const query = "DELETE FROM likes WHERE id = ?"
        const [info] = await this.connection.query(query, [id])
        return info.affectedRows
    }
}