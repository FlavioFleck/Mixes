export default class UserRepository{
    constructor(connection){
        this.connection = connection;
    }

    async add({name, cpf, email, password, birthday}) {
        const query = `
            INSERT INTO users(name, cpf, email, password, birthday)
                VALUES(?, ?, ?, ?, ?);
        `

        const [info] = await this.connection.query(query, [
            name,
            cpf,
            email,
            password,
            birthday
        ]);
        return info.insertId;
    }

    async delete({id}) {
        const query = `
            DELETE FROM users
                WHERE id = ?;
        `

        const [info] = await this.connection.query(query, [id]);
        return info.affectedRows;
    }

    async update({id, name, cpf, email, password, birthday}) {
        const query = `
            UPDATE users
                SET name = ?,
                    cpf = ?,
                    email = ?,
                    password = ?,
                    birthday = ?
            WHERE id = ?;
        `

        const [info] = await this.connection.query(query, [
            name,
            cpf,
            email,
            password,
            birthday,
            id
        ]);
        return info.affectedRows;
    }

    async getAll() {
        const query = `
            SELECT  name,
                    cpf,
                    email,
                    birthday,
                    created_at
                FROM users;
        `

        const [info] = await this.connection.query(query);
        return info;
    }

    async getById({id}) {
        const query = `
            SELECT  name,
                    cpf, 
                    email,
                    birthday,
                    created_at
                FROM users
            WHERE id = ?;
        `

        const [info] = await this.connection.query(query, [id]);
        return info[0];
    }

    async getByEmail({email}) {
        const query = `SELECT * FROM users WHERE email = ?`
        const [info] = await this.connection.query(query, [email])
        return info
    }
}