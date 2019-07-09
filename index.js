
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import UserController from './controller/userController';
import PropertyController from './controller/PropertyController';
import Auth from './helpers/Auth';
import Db from './config/connection'

dotenv.config();

const app = express();


(async () => {
    // Db.createUsersTable();
    Db.createPropertyTable();
})().catch(err => console.log(err.stack));

const options = {
    explorer: true,
};
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.post('/api/v1/signup', UserController.signup);
app.post('/api/v1/signin', UserController.signin);
app.post('/api/v1/create', Auth.verifyToken, PropertyController.create);
app.patch('/api/v1/property/:id', Auth.verifyToken, PropertyController.update);
app.patch('/api/v1/property/:id/sold', Auth.verifyToken, PropertyController.updateStatus);
app.delete('/api/v1/property/:id', Auth.verifyToken, PropertyController.delete);
app.get('/api/v1/property/:id', PropertyController.getProperty);
app.get('/api/v1/property', PropertyController.getAllProperty);



// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening to port ${PORT}`);
});


export default app;
