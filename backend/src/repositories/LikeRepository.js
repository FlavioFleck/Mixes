export default class LikeRepository {
    constructor(connection) {
        this.connection = connection
    }

    async add({user_id, post_id}) {
        const query = "INSERT INTO likes(user_id, post_id) VALUES (?, ?)" 
        const [info] = await this.connection.query(query, [
            user_id,
            post_id
        ])  

        const info2 = await this.getLikeByUserAndPost({user_id: user_id, post_id: post_id})
        return info2
    }

    async delete({id}) {
        const query = "DELETE FROM likes WHERE id = ?"
        const [info] = await this.connection.query(query, [id])
        return info.affectedRows
    }

    async likeCountByPostId({id}) {
        const query = "SELECT COUNT(*) AS like_count FROM likes WHERE post_id = ?;"
        const [info] = await this.connection.query(query, [id])
        return info[0]
    }

    async alreadyLiked({user_id, post_id}) {
        const query = "SELECT EXISTS(SELECT 1 FROM likes WHERE user_id = ? AND post_id = ?) AS already_liked;"
        const [info] = await this.connection.query(query, [user_id, post_id])
        return info[0].already_liked === 1
    }

    async getLikeByPost({post_id}) {
        const query = "SELECT id FROM likes WHERE post_id = ?"
        const [info] = await this.connection.query(query, [post_id])
        return info;
    }

    async getLikeByUserAndPost({user_id, post_id}) {
        const query = "SELECT id FROM likes WHERE user_id = ? AND post_id = ? LIMIT 1"
        const [info] = await this.connection.query(query, [user_id, post_id])

        if (!info || info.length === 0) {
            return {id: null}
        }
        
        return info[0];
    }
    
    
}