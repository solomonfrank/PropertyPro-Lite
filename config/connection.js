import { Pool } from 'pg';



let connectionString = process.env.DATABASE_LOCAL_URL;
class Db {
    constructor() {
        this.conn = new Pool({
            connectionString,
        });

        console.log('connected');
        return this.conn;
    }

    async static getInstance() {
        if (!this.pool) {
            this.pool = new Db();
        }
        return this.pool;
    }


    async static createUsersTable() {
        this.createTableQuery = `
    CREATE TABLE IF NOT EXISTS
    users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(120) NOT NULL,
  lastName VARCHAR(120) NOT NULL,
  gender VARCHAR (20) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  address VARCHAR(128) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  token TEXT NOT NULL,
  createdAt TIMESTAMP
  
  
    )
    `;
        this.client = await Db.getInstance();
        await this.client.query(`${this.createTableQuery}`);
        // Db.getInstance(this.createTableQuery).catch(err => console.log(err));
    }


}

export default Db;