/* eslint-disable consistent-return */

import jwt from 'jsonwebtoken';
import Response from './Response';


import usersData from '../model/User';
// import { create } from 'domain';

const Auth = {

    async generateToken(data) {
        try {
            const token = await jwt.sign({
                key: data,
            }, process.env.SECRET_KEY);

            return token;
        } catch (err) {
            return false;
        }
    },

    // eslint-disable-next-line consistent-return
    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];


        // token = token.trim();

        if (!token) {
            return Response.onError(res, 400, 'Not authorize to access the page');
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);

            const { id } = decoded.key;

            const params = { id };


            // const result = await User.init().find(params);
            const useId = usersData.find(item => (item.id === params.id));
            if (!useId) {
                return Response.onError(res, 400, 'invalid token provided');
            }


            req.userDt = params;

            next();
        } catch (err) {
            return Response.onError(res, 500, 'Internal server error');
        }
    },
};
export default Auth;
