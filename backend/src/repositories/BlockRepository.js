export default class BlockRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add({blockerUserId, blockedUserId}) {
        const query = "INSERT INTO block (blocker_user_id, blocked_user_id) VALUES (?, ?);"
        const [info] = this.connection.query(query, [
            blockerUserId,
            blockedUserId
        ])
        return info.insertId
    }

    async delete({id}) {
        const query = "DELETE FROM block WHERE id = ?"
        const [info] = this.connection.query(query, [id])
        return info.affectedRows
    }
}