module.exports = function ok(data) {
    var req = this.req;
    var res = this.res;
    console.log('ok', data);
    return res.status(200).json({
        ...data,
        errorCode: 0,
        errorMsg: 'Thành công',
        
    });
};