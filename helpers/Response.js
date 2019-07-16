
const Response = {

    onSuccess(res, statusCode, msg, responseText) {
        const value = responseText;
        if (typeof value.password !== 'undefined') {
            delete value.password;
        }



        return (res.status(statusCode).json({
            status: msg,
            data: value,
        })
        );
    },

    onError(res, statusCode, msg, responseText) {


        return (res.status(statusCode).json({
            status: msg,
            error: responseText,
        })
        );
    },
};

export default Response;
