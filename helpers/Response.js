
const Response = {

    onSuccess(res, statusCode, responseText) {
        const value = responseText;
        if (value.password) {
            delete value.password;
        }

        return (res.status(statusCode).json({
            status: statusCode,
            data: value,
        })
        );
    },

    onError(res, statusCode, responseText) {
        const value = responseText;
        if (value.password) {
            delete value.password;
        }
        return (res.status(statusCode).json({
            status: statusCode,
            data: responseText,
        })
        );
    },
};

export default Response;
