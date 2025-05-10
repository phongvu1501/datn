module.exports = function paramInvalid(error) {
    var req = this.req;
    var res = this.res;
    return res.status(200).json({
        errorCode: 1,
        errorMsg: 'Lỗi tham số',
        ...error
    });
};