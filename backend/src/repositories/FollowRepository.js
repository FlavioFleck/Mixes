export default class FollowRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add({followingUserId, followedUserId}) {
        const query = "INSERT INTO follows(following_user_id, followed_user_id) VALUES (?, ?)"
        const [info] = this.connection.query(query, [
            followingUserId,
            followedUserId
        ])
        return info.insertId
    }

    async delete({id}) {
        const query = "DELETE FROM follows WHERE id = ?"
        const [info] = this.connection.query(query, [id])
        return info.affectedRows
    }
}