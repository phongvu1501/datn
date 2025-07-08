const { max } = require("lodash");

module.exports={
    attributes:{
        username:{
            type: 'string',
            required: true,
            description: 'Tên đăng nhập của người dùng',
        },
        password:{
            type: 'string',
            required: true,
            description: 'Mật khẩu của người dùng',
        },
        email:{
            type: 'string',
            required: true,
            unique: true,
            isEmail: true,
            description: 'Email của người dùng',
        },
        phone:{
            type: 'string',
            required: true,
            unique: true,
            description: 'Số điện thoại của người dùng',
            maxLength: 15,
        },
    }
}