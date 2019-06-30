
import express from 'express';
import bodyParser from 'body-parser';
import UserController from './controller/userController';

import dotenv from 'dotenv';
dotenv.config();
const app = express();


app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.post('/api/v1/signup', UserController.signup);
app.post('/api/v1/signin', UserController.signin);


// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log(`listening to port ${PORT}`);
});


export default app;
