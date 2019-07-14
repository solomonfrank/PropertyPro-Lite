/* eslint-disable class-methods-use-this */

import Joi from 'joi';
import bcrypt from 'bcrypt';

class Validation {
    static init() {
        return new Validation();
    }

    sanitizeEmail() {
        return (Joi.string().email({ minDomainAtoms: 2 }).required().label('email address'));
    }


    sanitizePassword() {
        return (Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/));
    }

    sanitizePhone() {
        return Joi.number().required();
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
        return (Joi.string().trim().min(3).max(20).required());
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

            password: this.sanitizePassword(),
            phone_number: this.sanitizePhone(),

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
        this.saltRounds = 10;
        this.plainPassword = password;
        return bcrypt.hash(this.plainPassword, this.saltRounds);
    }

    async verifyPassword(password, hash) {

        this.hash = hash;
        this.plainPassword = password;

        return bcrypt.compare(this.plainPassword, this.hash);
    }
}
export default Validation;
