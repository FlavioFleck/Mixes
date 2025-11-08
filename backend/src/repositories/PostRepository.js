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
        const query = "DELETE FROM posts WHERE id = ?"
        const [info] = await this.connection.query(query, [id])
        return info.affectedRows
    }

    async getAll() {
        const query = "SELECT * FROM posts"
        const [info] = await this.connection.query(query)
        return info
    }

    async getById({id}) {
        const query = "SELECT * FROM posts WHERE id ?"
        const [info] = await this.connection.query(query, [id])
        return info[0]
    }
}