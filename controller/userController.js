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
            firstName, lastName, email, gender, password, address, phoneNumber,
        } = clean.value;

        const token = await Auth.generateToken(email);

        if (!token) {
            return Response.onError(res, 500, 'Internal server errr due to token');
        }


        const body = {
            firstName, lastName, email, gender, password, token, address, phoneNumber,
        };
        body.password = await Validation.init().hashPassword(password);
        body.createdAt = new Date();


        try {

            const result = await User.init().insert(body);


            return Response.onSuccess(res, 201, result.rows[0]);
        } catch (error) {


            if (error.routine === '_bt_check_unique') {
                return Response.onError(res, 400, 'email already exist');
            }
            return Response.onError(res, 500, 'Internal server error');

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
        }
    }
    static async create(req, res) {
        const schema = Validation.init().validateCreateProp();
        const clean = Joi.validate(req.body, schema);
        if (clean.error) {
            return Response.onError(res, 400, clean.error.details[0].message);
        }

        const userId = req.userDt.id;
        const ownerDetail = usersData.find(item => (item.id === parseInt(userId, 10)));

        const body = {
            id: propData.length + 1,
            owner: userId,
            ...clean.value,
            ownerEmail: ownerDetail.email,
        };
        body.created_on = new Date();
        propData.push(body);


        return Response.onSuccess(res, 201, body);
    }

    static async update(req, res) {
        const editBody = req.body;
        const { id } = req.params;

        if (!id) {
            return Response.onError(res, 400, 'Bad Request');
        }
        const prop = propData.find(item => (item.id === parseInt(id, 10)));
        if (!prop) {
            return Response.onError(res, 404, 'property not found');
        }

        prop.status = editBody.status;
        prop.price = editBody.price;
        prop.state = editBody.state;
        prop.city = editBody.city;
        return Response.onError(res, 200, prop);
    }

    static async updateStatus(req, res) {
        const editBody = req.body;
        const { id } = req.params;

        if (!id) {
            return Response.onError(res, 400, 'Bad Request');
        }
        const prop = propData.find(item => (item.id === parseInt(id, 10)));
        if (!prop) {
            return Response.onError(res, 404, 'property not found');
        }

        prop.status = editBody.status;

        return Response.onError(res, 200, prop);
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!id) {
            return Response.onError(res, 400, 'Bad Request');
        }
        const found = propData.find(item => (item.id === parseInt(id, 10)));

        const propIndex = propData.indexOf(found);

        if (propIndex === -1) {
            return Response.onError(res, 400, 'property not found');
        }
        propData.splice(propIndex, 1);

        return Response.onError(res, 200, 'property successfully deleted');
    }

    static async viewProp(req, res) {
        const { id } = req.params;
        const { type } = req.query;
        let found;

        if (typeof type === 'undefined') {
            found = propData.find(item => (item.id === parseInt(id, 10)));
        } else {
            found = propData.find(item => (item.type === type));
        }

        if (!found) {
            return Response.onError(res, 404, 'property not found');
        }
        return Response.onError(res, 200, found);
    }
    static async getAllProperty(req, res) {
        return Response.onSuccess(res, 200, propData);
    }

}

export default UserController;