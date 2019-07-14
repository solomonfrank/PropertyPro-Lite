/* eslint-disable class-methods-use-this */

import Joi from 'joi';
import bcrypt from 'bcrypt';
import { join } from 'path';

class Validation {
    static init() {
        return new Validation();
    }
    emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    sanitizeEmail() {
        return (Joi.string().required().label('email address'));
    }


    sanitizePassword() {
        return (Joi.string().min(5));
    }

    sanitizePhone() {
        return Joi.string().min(8).required();
    }


    sanitizeConfirmPassword() {
        return (Joi.string().required().valid(Joi.ref('password')).options({
            language: {
                any: {
                    allowOnly: '!!Password do not match',
                },
            },
        })
        );
    }

    sanitizeName() {
        return (Joi.string().trim().min(3).max(20));
    }

    validateUpdate() {
        this.schema = {
            status: this.sanitizeName()
        }

        return this.schema;
    }

    validateRegister() {
        this.schema = {
            email: this.sanitizeEmail(),
            first_name: this.sanitizeName().label('first name'),
            last_name: this.sanitizeName().label('last name'),
            phone: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
            country: Joi.string(),
            password: this.sanitizePassword(),
            phone_number: this.sanitizeName(),
            is_admin: Joi.boolean(),
            street: Joi.string(),
            city: Joi.string(),

            address: this.sanitizeName(),

        };


        return this.schema;
    }

    validateCreateProp() {
        this.schema = {


            status: this.sanitizeName(),
            price: Joi.number().required(),
            state: this.sanitizeName(),
            city: this.sanitizeName(),
            address: this.sanitizeName(),
            type: this.sanitizeName(),


        };
        return this.schema;
    }

    validateAdmin() {
        const registerSchema = this.validateRegister();
        this.schema = {
            ...registerSchema,
            isAdmin: Joi.bool().required(),
            type: this.sanitizeName(),
        };
        return this.schema;
    }

    validateSignin() {
        this.schema = {
            email: this.sanitizeEmail(),
            password: this.sanitizePassword(),
        };
        return this.schema;
    }




    async hashPassword(password) {
        console.log(password);
        this.saltRounds = 10;
        // this.plainPassword = password;
        console.log()
        try {
            return bcrypt.hash(password, 10);
        } catch (err) {
            console.log('hello')
            console.log(err.stack);
        }

    }

    async verifyPassword(password, hash) {

        this.hash = hash;
        this.plainPassword = password;
        try {
            return bcrypt.compare(this.plainPassword, this.hash);
        } catch (err) {
            console.log(err.stack);
        }

    }
}
export default Validation;
