export default class LikeRepository {
    constructor(connection) {
        this.connection = connection
    }

    add({userId, postId}) {
        const query = "INSERT INTO likes(user_id, post_id) VALUES (?, ?)" 
        const [info] = this.connection.query(query, [
            userId,
            postId
        ])
        return info.insertId
    }

    delete({id}) {
        const query = "DELETE FROM likes WHERE id = ?"
        const [info] = this.connection.query(query, [id])
        return info.affectedRows
    }
}