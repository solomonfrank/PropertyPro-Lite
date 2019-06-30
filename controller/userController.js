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

    static async signin(req, res) {
        const schema = Validation.init().validateSignin();
        const clean = Joi.validate(req.body, schema);
        if (clean.error) {
            return Response.onError(res, 400, clean.error.details[0].message);
        }
        const { email, password } = clean.value;
        // const body = { email };


        try {
            const userDetail = usersData.find(item => (item.email === email));


            if (!userDetail) {
                return Response.onError(res, 400, 'invalid credential');
            }

            const hashPassword = userDetail.password;


            const pass = await Validation.init().verifyPassword(password, hashPassword);


            if (!pass) {
                return Response.onError(res, 400, 'invalid email or password');
            }
            const payload = {
                id: userDetail.id,


            };
            userDetail.token = await Auth.generateToken(payload, res);
            const copyUserDetail = { ...userDetail };
            return Response.onSuccess(res, 200, copyUserDetail);
        } catch (error) {
            return Response.onError(res, 500, 'internal server error');
        }
    }
}

export default UserController;