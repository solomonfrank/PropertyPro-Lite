
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import UserController from './controller/userController';
import PropertyController from './controller/PropertyController';
import Auth from './helpers/Auth';
import Db from './config/connection';

import MailController from './config/Mail';
import { resolve } from 'path';

import { uploader, cloudinaryConfig } from './config/cloudinaryConfig';
import { multerUploads, dataUri } from './config/multer';

// app.use(express.static(resolve(__dirname, 'src/public')));

dotenv.config();

const app = express();
app.use('*', cloudinaryConfig);

//(async () => {
// Db.createUsersTable();
// Db.createPropertyTable();
// })().catch(err => console.log(err.stack));

const options = {
    explorer: true,
};
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
// app.use('*', cloudinaryConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.post('/auth/signup', UserController.signup);
app.post('/auth/signin', UserController.signin);
app.post('/property', multerUploads, Auth.cloudinaryHandler, Auth.Authorization, Auth.verifyToken, PropertyController.create);
// app.post('/api/v1/property', Auth.Authorization, Auth.verifyToken, PropertyController.create);
app.patch('/property/:id', Auth.Authorization, Auth.verifyToken, PropertyController.update);
app.patch('/property/:id/sold', Auth.Authorization, Auth.verifyToken, PropertyController.updateStatus);
app.delete('/property/:id', Auth.Authorization, Auth.verifyToken, PropertyController.delete);
app.get('/property/search', PropertyController.searchProperty);
app.get('/property/:id', PropertyController.getProperty);
app.get('/property', PropertyController.getAllProperty);
app.post('/auth/:email/reset_password', MailController.sendMail);




// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening to port ${PORT}`);
});


export default app;
