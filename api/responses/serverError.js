module.exports = function serverError(error) {
    var req = this.req;
    var res = this.res;
    console.log('serverError', error);
    return res.status(200).json({
        errorCode: 500,
        errorMsg: 'Lỗi hệ thống',
    });
};