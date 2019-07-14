import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';
import usersData from '../model/User';
import propData from '../model/Property';
import Validation from '../helpers/Validation';
import Auth from '../helpers/Auth';
import Response from '../helpers/Response';
import User from '../model/User';


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
            first_name, last_name, email, password, address
        } = clean.value;

        const token = await Auth.generateToken(email);
        if (!token) {
            return Response.onError(res, 500, 'server could not generate token');
        }
        const body = {
            first_name, last_name, email, password, token, address

        };
        body.password = await Validation.init().hashPassword(password);
        body.created_at = new Date();


        try {

            //const result = await User.init().insert(body);
            return await User.init().insertAll(res, body);

            //return Response.onSuccess(res, 201, result.rows[0]);
        } catch (error) {


            if (error.routine === '_bt_check_unique') {
                return Response.onError(res, 400, 'email already exist');
            }
            return Response.onError(res, 500, 'Internal server error');
            //console.log(error.stack);

        }



    }

    static async signin(req, res) {
        const schema = Validation.init().validateSignin();
        const clean = Joi.validate(req.body, schema);
        if (clean.error) {
            return Response.onError(res, 400, clean.error.details[0].message);
        }
        const { email, password } = clean.value;

        const body = { email };


        try {

            const result = await User.init().findByEmail(body);

            if (!result.rows[0]) {
                return Response.onError(res, 400, 'invalid credential');
            }
            const hashPassword = result.rows[0].password;
            const pass = await Validation.init().verifyPassword(password, hashPassword);
            if (!pass) {
                return Response.onError(res, 400, 'invalid email or password');
            }
            const payload = {
                id: result.rows[0].id,
                type: result.rows[0].type,

            };
            result.rows[0].token = await Auth.generateToken(payload, res);


            return Response.onSuccess(res, 200, result.rows[0]);
        } catch (error) {

            return Response.onError(res, 500, 'internal server error');
            //console.log(error.stack);
        }
    }











}

export default UserController;