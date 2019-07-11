import mailgun from 'mailgun-js';
import User from '../model/User';
import Response from '../helpers/Response';
import Validation from '../helpers/Validation';

import Joi from 'joi';
import bcrypt from 'bcrypt';

class MailController {

    static async sendMail(req, res) {

        let email = req.params.email;
        const bodyEmail = { email };
        let body = req.body;
        let found = await User.init().findByEmail(bodyEmail);


        if (!found.rows[0]) {
            return Response.onError(res, 200, 'users does not exist')
        }
        let foundId = found.rows[0].id;
        const mailDetail = {
            apiKey: process.env.API_KEY,
            domain: process.env.Domain,
        };

        const mg = mailgun(mailDetail);

        if ((Object.keys(body).length) === 0) {
            let randomPwd = Math.random().toString(36).replace('0.', '')

            let password = await Validation.init().hashPassword(randomPwd);

            const passBody = { password };
            let pesin = await User.init().update(foundId, passBody);
            const data = {
                from: 'Excited User <noreply@sandboxc795371c49f34527b445213e56db4e31.mailgun.org	>',
                to: `${email}`,
                subject: 'New password',
                text: `Your new generated password is ${randomPwd}`
            };

            try {
                await mg.messages().send(data);
                return Response.onSuccess(res, 204, 'A new password has been send to your mail');

            } catch (err) {
                // return Response.onError(res, 500, 'internal server error');
                console.log(err.stack);
            }

        } else {

            let { password: oldPassWord, newPassword } = body;
            console.log(newPassword);

            let confirmPass = await Validation.init().verifyPassword(oldPassWord, found.rows[0].password);

            if (!confirmPass) {
                return Response.onError(res, 400, "invalid password");
            }
            let password = await Validation.init().hashPassword(newPassword);
            console.log(password);
            const passBody = { password };
            console.log(foundId);
            let pesin = await User.init().update(foundId, passBody);

            const data = {
                from: 'Excited User <noreply@sandboxc795371c49f34527b445213e56db4e31.mailgun.org	>',
                to: `${email}`,
                subject: 'New password',
                text: 'Your has password has been changed'
            };
            try {
                await mg.messages().send(data);
                return Response.onSuccess(res, 200, 'A new password has been send to your mail');

            } catch (err) {
                // return Response.onError(res, 500, 'internal server error');
                console.log(err.stack);
            }

        }







    }

}

export default MailController;