import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';
import usersData from '../model/User';

import Validation from '../helpers/Validation';
import Auth from '../helpers/Auth';
import Response from '../helpers/Response';

const app = express();
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);




class UserController {

    static async signup(req, res) {
        const schema = Validation.init().validateRegister();
        const clean = Joi.validate(req.body, schema);
        if (clean.error) {
            return Response.onError(res, 400, clean.error.details[0].message);
        }

        const {
            firstName, lastName, email, gender, password, address,
        } = clean.value;

        const token = await Auth.generateToken(email);



        const body = {
            firstName, lastName, email, gender, password, token, address,
        };
        body.password = await Validation.init().hashPassword(password);
        body.createdAt = new Date();

        const foundEmail = usersData.find(item => (item.email === body.email));

        if (foundEmail) {
            return Response.onError(res, 400, 'email already exist');
        }
        const userVal = {
            id: usersData.length + 1,
            ...body,
        };

        usersData.push(userVal);
        const displayUser = { ...userVal };
        return Response.onSuccess(res, 201, displayUser);
    }
}

export default UserController;