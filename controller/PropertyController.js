import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';

import Validation from '../helpers/Validation';
import Auth from '../helpers/Auth';
import Response from '../helpers/Response';
import Property from '../model/Property';
import User from '../model/User';
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads, dataUri } from '../config/multer';


const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

class PropertyController {

    static async create(req, res) {



        //  if ((Object.keys(req.body).length < 1)) {
        //  console.log('yes')
        // return Rehrsponse.onError(res, 400, 'error', 'fields are required');
        // }
        // let schema = Validation.init().validateCreateProp();
        //let clean = Joi.validate(req.body, schema);
        //if (clean.error) {
        //return Response.onError(res, 400, 'error', clean.error.details[0].message);
        //}
        //let { price, status, state, city, address, type, image_url } = clean.value;






        let { price, state, city, address, type } = req.body;
        if (!price || !type || !address || !state || !city) {
            return Response.onError(res, 400, 'error', 'fields are required');
        }



        let body = { price, state, city, address, type };
        body.status = "available";
        body.owner = req.userData.id;
        body.created_on = new Date();
        body.image_url = req.image_url;
        let id = parseInt(body.owner);

        let searchBy = { id }

        try {
            let found = await User.init().find({ id });

            body.owner_email = found.rows[0].email;


            return await Property.init().insertAll(res, body);

            // let result = await Property.init().insert(body);
            // return Response.onSuccess(res, 201, result.rows[0]);

        } catch (err) {

            console.log(err.stack);
            // return Response(res, 500, 'error', "Internal server error");
        }


    }
    static async update(req, res) {

        let propId = req.params.id;


        // let schema = Validation.init().validateCreateProp();
        //let clean = Joi.validate(req.body, schema);
        //if (clean.error) {

        //return Response.onError(res, 400, 'error', clean.error.details[0].message)
        //}

        let { price } = req.body;

        let body = { price };
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
        // if (isNaN(id)) {
        //  return Response.onError(res, 400, 'invalid property number');
        //  }
        //  let schema = Validation.init().validateUpdate();
        // let clean = Joi.validate(req.body, schema);
        // if (clean.error) {
        // return Response.onError(res, 400, clean.error.details[0].message);
        // }

        // let { status } = req.body;
        //  let body = { status }
        let cBody = { status: "sold" }


        try {

            let found = await Property.init().findById(id, '*');

            if (!found.rows[0]) {
                return Response.onError(res, 404, 'Property does not exist');
            }
            let result = await Property.init().update(id, cBody);

            return Response.onSuccess(res, 200, 'success', result.rows[0]);
        }
        catch (err) {
            //return Response.onError(res, 500, 'internal server error');
            console.log(err.stack);
        }


    }

    static async delete(req, res) {

        let id = req.params.id;




        try {

            const found = await Property.init().findById(id, '*');
            // console.log(found.rows[0]);
            if (typeof found.rows[0] === 'undefined') {

                return Response.onError(res, 404, 'error', 'property does not exist');
            }

            await Property.init().delete(id);
            return Response.onSuccess(res, 200, 'success', { message: "property deleted succesfully" });

        } catch (err) {
            //return Response.onError(res, 500, 'internal server error');
            console.log(err.stack);

        }
    }

    static async getAllProperty(req, res) {
        const { token } = req.body || req.header('Authorization');

        try {

            if (!token) {
                return Response.onError(res, 403, 'error', 'Not authorize to access the page');
            }
            const result = await Property.init().findAll('*');

            console.log(result)
            let resultArray = result.rows;

            //  if (resultArray.length < 1) {
            //  return Response.onSuccess(res, 404, 'success', 'result not found');

            //    }
            console.log(resultArray);
            return Response.onSuccess(res, 200, 'success', resultArray)
        } catch (err) {

            // return Response.onError(res, 500, 'error', 'Internal server error');
            console.log(err.stack);
        }

    }

    static async getProperty(req, res) {

        let id = req.params.id;





        try {
            const found = await Property.init().findById(id, '*');

            if (typeof found.rows[0] === 'undefined') {

                return Response.onError(res, 404, 'error', 'property does not exist');
            }
            const result = await Property.init().findById(id, '*');


            let resultArray = result.rows[0];


            if (resultArray.length < 1) {
                return Response.onSuccess(res, 404, 'success', 'result not found');

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


            // return Response.onError(res, 500, 'error', 'Internal server error');
            console.log(error.stack);
        }




    }

}


export default PropertyController;