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
            return Response(res, 400, clean.error.details[0].message);
        }
        let ownerId = req.userData.id;

        let { status, price, state, city, address, type } = clean.value;
        let body = { status, price, state, city, address, type };
        body.owner = ownerId;
        body.created_on = new Date();

        try {

            return await Property.init().insertAll(res, body);
            // let result = await Property.init().insert(body);
            //  return Response.onSuccess(res, 201, result.rows[0]);

        } catch (err) {


            return Response(res, 500, 'error', "Internal server error");
        }


    }
    static async update(req, res) {

        let propId = req.params.id;
        if (isNaN(propId)) {
            return Response.onError(res, 400, 'error', 'invalid property number');
        }

        let schema = Validation.init().validateCreateProp();
        let clean = Joi.validate(req.body, schema);
        if (clean.error) {

            return Response.onError(res, 400, 'error', clean.error.details[0].message)
        }

        let { status, state, price, city } = clean.value;

        let body = { state, status, price, city };
        try {

            let result = await Property.init().update(propId, body);
            return Response.onSuccess(res, 200, 'success', result.rows[0]);

        } catch (err) {
            // console.log(err.stack);
            return Response.onError(res, 500, 'error', "Internal server error");
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

    static async delete(req, res) {

        let id = req.params.id;

        if (isNaN(id)) {
            return Response.onError(res, 400, 'error', 'invalid property number');
        }


        try {

            const found = await Property.init().findById(id, '*');
            // console.log(found.rows[0]);
            if (typeof found.rows[0] === 'undefined') {

                return Response.onError(res, 404, 'error', 'property does not exist');
            }

            await Property.init().delete(id);
            return Response.onSuccess(res, 200, 'success', 'property deleted succesfully');

        } catch (err) {
            //return Response.onError(res, 500, 'internal server error');
            console.log(err.stack);

        }
    }

    static async getAllProperty(req, res) {

        try {

            const result = await Property.init().findAll('*');


            let resultArray = result.rows;

            if (resultArray.length < 1) {
                return Response.onSuccess(res, 200, 'result not found');

            }
            return Response.onSuccess(res, 200, resultArray)
        } catch (err) {

            return Response.onError(res, 200, 'Internal server error');
        }

    }

    static async getProperty(req, res) {

        let id = req.params.id;
        if (isNaN(id)) {
            return Response.onError(res, 400, 'error', 'invalid property number');
        }



        try {
            const found = await Property.init().findById(id, '*');
            if (typeof found.rows[0] === 'undefined') {

                return Response.onError(res, 404, 'error', 'property does not exist');
            }
            const result = await Property.init().findById(id, '*');


            let resultArray = result.rows[0];


            if (resultArray.length < 1) {
                return Response.onSuccess(res, 200, 'success', 'result not found');

            }
            return Response.onSuccess(res, 200, 'success', resultArray)
        } catch (err) {

            return Response.onError(res, 500, 'error', 'Internal server error');

        }

    }

    static async searchProperty(req, res) {

        let { type } = req.query;
        let body = { type }
        try {
            const found = await Property.init().find(body, '*');
            if (found.rows < 1) {
                return Response.onSuccess(res, 200, 'success', "No record found");
            }

            return Response.onSuccess(res, 200, 'success', found.rows);

        } catch (error) {


            return Response.onError(res, 500, 'error', 'Internal server error');
        }




    }

}


export default PropertyController;