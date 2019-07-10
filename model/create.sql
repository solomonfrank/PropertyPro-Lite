
 CREATE TABLE IF NOT EXISTS
    users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(120) NOT NULL,
  lastName VARCHAR(120) NOT NULL,
  gender VARCHAR (20) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  phoneNumber VARCHAR(120) NOT NULL,
  address VARCHAR(128) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  token TEXT NOT NULL,
  createdAt TIMESTAMP
  
  
    );



CREATE TABLE IF NOT EXISTS property(

    id SERIAL PRIMARY KEY,
    ownerId INT REFERENCES users(id),
    status  varchar(50) not null,
    price float not null,
    state varchar(50) not null,
    city varchar(50) not null,
    address varchar(50) not null,
    type varchar(50) not null,
    created_on timestamp,
    image_url varchar(100)
   );
