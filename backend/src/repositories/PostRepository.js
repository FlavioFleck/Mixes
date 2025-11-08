export default class PostRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add({userId, content, file, songId, postFatherId}) {
        const query = "INSERT INTO posts (user_id, content, files, song_id, post_father_id) VALUES (?, ?);"
        const [info] = await this.connection.query(query, [
            userId, 
            content, 
            file, 
            songId, 
            postFatherId
        ])
        return info.insertId
    }

    async delete({id}) {
        const query = "DELETE FROM post WHERE id = ?"
        const [info] = await this.connection.query(query, [id])
        return info.affectedRows
    }
}