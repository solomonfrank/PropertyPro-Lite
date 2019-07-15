/* eslint-disable consistent-return */

import jwt from 'jsonwebtoken';
import Response from './Response';
import dotenv from 'dotenv';
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
        console.log(req.body);
        const bearerHead = req.headers.authorization || req.body.token;

        if (typeof bearerHead === 'undefined') {
            return Response.onError(res, 403, 'error', 'forbidden');
        }
        let tokenArray = bearerHead.split(' ');
        let token = tokenArray[1];
        console.log(token)




        // token = token.trim();

        if (!token) {
            return Response.onError(res, 403, 'Not authorize to access the page');
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);


            const { id } = decoded.key;

            const params = { id };


            const result = await User.init().find(params);


            if (!result.rows[0]) {
                return Response.onError(res, 400, 'invalid token provided');
            }


            req.userData = params;
            console.log(req.userData);
            next();
        } catch (err) {
            return Response.onError(res, 403, 'invalid token provided');
            // console.log(err.stack);
        }
    },
};
export default Auth;
