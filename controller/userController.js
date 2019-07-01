import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';
import usersData from '../model/User';
import propData from '../model/Property';
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


}

export default UserController;