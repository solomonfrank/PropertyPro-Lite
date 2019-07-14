
const Response = {

    onSuccess(res, statusCode, responseText) {
        const value = responseText;
        if (value.password) {
            delete value.password;
        }
        if (value.phonenumber) {
            value.phoneNumber = value.phonenumber;
            delete value.phonenumber;

        }

        return (res.status(statusCode).json({
            status: statusCode,
            data: value,
        })
        );
    },

    onError(res, statusCode, responseText) {


        return (res.status(statusCode).json({
            status: statusCode,
            error: responseText,
        })
        );
    },
};

export default Response;
