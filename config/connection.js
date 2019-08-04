import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const connectionString = process.env.DATABASE_LOCAL_URL || process.env.DATABASE_URL;
class Db {
  constructor() {
    this.conn = new Pool({
      connectionString,
      ssl: true,

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
  
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  phone_number VARCHAR(120) NOT NULL,
  address VARCHAR(128) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  token TEXT  NULL,
  phone VARCHAR(200) NULL,
  country VARCHAR(100) NULL,
  state VARCHAR(100) NULL,
  street VARCHAR(100) NULL,
    zip VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
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
        status  varchar(50)  null,
        price float null,
        state varchar(50) null,
        city varchar(50)  null,
        address varchar(50) null,
        type varchar(50) null,
        created_on timestamp,
        image_url varchar(100) NULL,
        owner_email VARCHAR(100) NULL
       );
       `;

    this.client = await Db.getInstance();
    await this.client.query(`${this.createTableQuery}`);
  }
}

export default Db;
