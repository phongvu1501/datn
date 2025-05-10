module.exports = function success(dataInput = { data: {} }) {
    var req = this.req;
    var res = this.res;
    return res.status(200).json({
        errorCode: 0,
        errorMsg: 'Thành công',
        ...dataInput
    });
};