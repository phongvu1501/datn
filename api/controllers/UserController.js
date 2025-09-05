const bcrypt = require('bcrypt');
// const { update } = require('lodash');

module.exports = {
  // Đăng ký người dùng
  register: async function (req, res) {
    const { username, password, email, phone } = req.body;
    console.log('Register request:', req.body);

    if (!username || !password || !email || !phone) {
      return res.badRequest({ err: 1, errMsg: 'Thiếu dữ liệu' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.badRequest({ err: 2, errMsg: 'Email không hợp lệ' });
    }

    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.badRequest({ err: 3, errMsg: 'SĐT không hợp lệ' });
    }

    const existed = await User.findOne({ or: [{ username }, { email }] });
    if (existed) {
      return res.badRequest({ err: 4, errMsg: 'Username hoặc email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      phone
    });

    // Gọi helper tạo token
    const tokenInfo = await sails.helpers.createNewToken.with({ user: newUser });

    return res.ok({
      err: 0,
      errMsg: 'Đăng ký thành công',
      data: {
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        token: tokenInfo.token,
        expiresAt: tokenInfo.expiresAt,
        tokenType: 'Bearer'
      }
    });
    // console.log(tokenInfo);
  },

  // Đăng nhập
  login: async function (req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.badRequest({ err: 1, errMsg: 'Thiếu username hoặc password' });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.badRequest({ err: 2, errMsg: 'Tài khoản không tồn tại' });
      }

      const isValid = await sails.helpers.comparePassword.with({
        password,
        hashedPassword: user.password
      });

      if (!isValid) {
        return res.badRequest({ err: 3, errMsg: 'Sai mật khẩu' });_
      }

      const tokenInfo = await sails.helpers.createNewToken.with({ user });

      return res.ok({
        err: 0,
        errMsg: 'Đăng nhập thành công',
        data: {
          token: tokenInfo.token,
          expiresAt: tokenInfo.expiresAt,
          tokenType: 'Bearer',
        }
      });

    } catch (error) {
      console.error('Lỗi login:', error);
      return res.serverError({ errorCode: 500, errorMsg: 'Lỗi hệ thống' });
    }
  },

  //Đăng xuất
  logout: async function (req, res) {
    try {
      const token = req.token; // Lấy từ policy đã xác thực

      const deletedToken = await Token.destroy({ token });
      if (!deletedToken) {
        return res.notFound({ message: 'Token không tồn tại hoặc đã bị xóa.' });
      }

      return res.ok({ message: 'Đăng xuất thành công.' });
    } catch (err) {
      sails.log.error('Logout error:', err);
      return res.serverError({ message: 'Có lỗi xảy ra khi đăng xuất.' });
    }
  },

  // Cập nhật thông tin người dùng
  update: async function (req, res) {
    try {

      const { email, phone } = req.body;
      const { id: userId } = req.user
      // Kiểm tra đầu vào
      if (!email || !phone) {
        return res.badRequest({ err: 1, errMsg: 'Thiếu dữ liệu' });
      }

      // Kiểm tra email hợp lệ
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.badRequest({ err: 7, errMsg: 'Email không hợp lệ' });
      }

      // Cập nhật thông tin người dùng
      const updatedUser = await User.updateOne({ id: userId }).set({

        email,
        phone
      });

      if (!updatedUser) {
        return res.serverError({ err: 8, errMsg: 'Cập nhật không thành công' });
      }

      return res.ok({ err: 0, errMsg: 'Cập nhật thành công', data: updatedUser });

    } catch (err) {
      sails.log.error('Lỗi trong update:', err);
      return res.serverError({ err: 9, errMsg: 'Có lỗi xảy ra ở máy chủ', detail: err.message });
    }
  },




  getProfile: async function (req, res) {
    const userId = req.user?.id;

    if (!userId) {
      return res.forbidden({ errCode: 1, message: 'Bạn chưa đăng nhập.' });
    }

    const user = await User.findOne({ id: userId })
    console.log('user', req.user);
    const roles = await UserRole.find({ id: user.roles });
    if (!roles.length) {
      return res
    }
    const lisIdMenu = roles.map(x => x.menus).flat();
    const menus = await Menu.find({ id: lisIdMenu });
    if (!user) {
      return res.notFound({ errCode: 1, message: 'Không tìm thấy người dùng.' });
    }

    return res.ok({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        menus: menus
      }
    });
  },




};
