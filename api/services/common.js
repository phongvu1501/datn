const common = {};


common.success = (dataInput = {}) => {
    return { ...dataInput, errorCode: 0, errorMsg: 'Thành công', }
}
common.paramError = (dataInput = {}) => {
    return { ...dataInput, errorCode: 1, errorMsg: 'Tham số không hợp lệ', }
}
common.serverError = (dataInput = {}) => {
    console.log('serverError', dataInput)
    return { ...dataInput, errorCode: 2, errorMsg: 'Lỗi server', }
}
common.error = (dataInput = {}) => {
    return { errorCode: 3, errorMsg: 'Lỗi không xác định', ...dataInput }
}

common.validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/;
    return re.test(email); // return true if valid, false if not
}












module.exports = common