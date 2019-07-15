/* eslint-disable consistent-return */

import jwt from 'jsonwebtoken';
import Response from './Response';
import dotenv from 'dotenv';
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads, dataUri } from '../config/multer'
dotenv.config();


import User from '../model/User';
// import { create } from 'domain';

const Auth = {

    async generateToken(data) {
        try {
            const token = await jwt.sign({
                key: data,
            }, process.env.SECRET_KEY);

            return token;

        } catch (err) {
            console.log(err.stack);
            return false;

        }
    },

    // eslint-disable-next-line consistent-return
    async verifyToken(req, res, next) {



        try {
            const bearerHead = req.headers.authorization || req.body.token;

            if (typeof bearerHead === 'undefined') {
                return Response.onError(res, 403, 'error', 'forbidden');
            }
            let tokenArray = bearerHead.split(' ');
            let token = tokenArray[1];





            // token = token.trim();

            if (!token) {
                return Response.onError(res, 403, 'Not authorize to access the page');
            }

            const decoded = await jwt.verify(token, process.env.SECRET_KEY);


            const { id } = decoded.key;

            const params = { id };


            const result = await User.init().find(params);


            if (!result.rows[0]) {
                return Response.onError(res, 400, 'invalid token provided');
            }


            req.token = params;

            next();
        } catch (err) {
            return Response.onError(res, 403, 'invalid token provided');
            // console.log(err.stack);
        }
    },

    async Authorization(req, res, next) {



        try {
            const bearerHead = req.headers.authorization || req.body.token;

            if (typeof bearerHead === 'undefined') {
                return Response.onError(res, 403, 'error', 'forbidden');
            }
            let tokenArray = bearerHead.split(' ');
            let token = tokenArray[1];
            req.token = token;
            console.log(req.token);
            next();
        } catch (error) {
            console.log(error.stack);
        }




        // token = token.trim();



        const decoded = await jwt.verify(token, process.env.SECRET_KEY);


        const { id } = decoded.key;


    },
    async verifyField(req, res, next) {

        try {
            //dataUris(req);
            //dataUri(req);
            const { property_name, status, price, state, city, type } = req.body;
            //const image = req.file;
            //const image = req.file;


            if (status && city && state && property_name && price && image && type) {

                next();
            } else {
                res.status(403).json({ status: 403, error: 'please fill all filled correctly' });
            }
        }
        catch (errors) {
            //res.status(403).json({status:403,error:'please fill all filled correctly and upload an image'});
            console.log(errors.stack);
        }

    },
    async cloudinaryHandler(req, res, next) {


        if (req.file !== undefined) {




            try {
                const file = dataUri(req).content;
                let result = await uploader.upload(file);


                req.image_url = result.url;

                next();
            } catch (err) {
                console.log(err.stack);
            }
        } else {
            return Response.onError(res, 400, 'error', 'fields are required');

        }
    },
};
export default Auth;
