export default class UserRepository{
    constructor(connection){
        this.connection = connection;
    }

    async add(user) {
        const query = `
            INSERT INTO users(name, lastname, email, password, birthday, created_at)
                VALUES(?, ?, ?, MD5(?), ?, ?);
        `

        const [info] = await this.connection.query(query, [
            user.name,
            user.lastname,
            user.email,
            user.password,
            user.birthday,
            user.createdAt
        ]);
        return info.insertId;
    }
}