import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


let connectionString = process.env.DATABASE_LOCAL_URL || process.env.DATABASE_URL;
class Db {
    constructor() {
        this.conn = new Pool({
            connectionString,
            ssl: true

        });

        console.log('connected');
        return this.conn;
    }

    static async getInstance() {
        if (!this.pool) {
            this.pool = new Db();
        }
        return this.pool;
    }


    static async createUsersTable() {
        this.createTableQuery = `
    CREATE TABLE IF NOT EXISTS
    users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  gender VARCHAR (20) NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(128) NULL,
  phoneNumber VARCHAR(120) NULL,
  address VARCHAR(128) NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  token TEXT  NULL,
  created_at TIMESTAMP
  
  
    );
    `;
        this.client = await Db.getInstance();
        await this.client.query(`${this.createTableQuery}`);
        // Db.getInstance(this.createTableQuery).catch(err => console.log(err));
    }

    static async createPropertyTable() {
        this.createTableQuery = ` 
        CREATE TABLE IF NOT EXISTS property(

        id SERIAL PRIMARY KEY,
        owner INT REFERENCES users(id),
        status  varchar(50) not null,
        price float not null,
        state varchar(50) not null,
        city varchar(50) not null,
        address varchar(50) not null,
        type varchar(50) not null,
        created_on timestamp,
        image_url varchar(100)
       );
       `;

        this.client = await Db.getInstance();
        await this.client.query(`${this.createTableQuery}`);

    }


}

export default Db;
