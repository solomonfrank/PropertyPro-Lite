/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */


import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import UserController from './controller/userController';
import Auth from './helpers/Auth';

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
app.post('/api/v1/create', Auth.verifyToken, UserController.create);
app.patch('/api/v1/property/:id', Auth.verifyToken, UserController.update);
app.patch('/api/v1/property/:id/sold', Auth.verifyToken, UserController.updateStatus);
app.delete('/api/v1/property/:id', Auth.verifyToken, UserController.delete);



// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening to port ${PORT}`);
});


export default app;
