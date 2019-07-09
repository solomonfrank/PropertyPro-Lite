import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';

import Validation from '../helpers/Validation';
import Auth from '../helpers/Auth';
import Response from '../helpers/Response';
import Property from '../model/Property';


const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

class PropertyController {

    static async create(req, res) {

        let schema = Validation.init().validateCreateProp();
        let clean = Joi.validate(req.body, schema);
        if (clean.error) {
            return Response(400, res, clean.error.details[0].message);
        }
        let ownerId = req.userData.id;

        let { status, price, state, city, address, type } = clean.value;
        let body = { status, price, state, city, address, type };
        body.ownerId = ownerId;
        body.created_on = new Date();

        try {

            let result = await Property.init().insert(body);
            return Response.onSuccess(res, 201, result.rows[0]);

        } catch (err) {


            return Response(500, res, "Internal server error");
        }


    }
    static async update(req, res) {

        let propId = req.params.id;
        if (isNaN(propId)) {
            return Response.onError(res, 400, 'invalid property number');
        }

        let schema = Validation.init().validateCreateProp();
        let clean = Joi.validate(req.body, schema);
        if (clean.error) {

            return Response.onError(res, 400, clean.error.details[0].message)
        }

        let { status, state, price, city } = clean.value;

        let body = { state, status, price, city };
        try {

            let result = await Property.init().update(propId, body);
            return Response.onSuccess(res, 200, result.rows[0]);

        } catch (err) {
            // console.log(err.stack);
            return Response.onError(res, 500, "Internal server error");
        }

    }

    static async updateStatus(req, res) {

        let id = req.params.id;
        if (isNaN(id)) {
            return Response.onError(res, 400, 'invalid property number');
        }
        let schema = Validation.init().validateUpdate();
        let clean = Joi.validate(req.body, schema);
        if (clean.error) {
            return Response.onError(res, 400, clean.error.details[0].message);
        }
        let { status } = clean.value;
        let body = { status }



        try {

            let found = await Property.init().findById(id, '*');
            if (!found.rows[0]) {
                return Response.onError(res, 404, 'Property does not exist');
            }
            let result = await Property.init().update(id, body);
            return Response.onSuccess(res, 200, result.rows[0]);
        }
        catch (err) {
            return Response.onError(res, 500, 'internal server error');
        }


    }
}


export default PropertyController;