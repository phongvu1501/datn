module.exports = {
    listUser: async (req, res) => {
        try {
            const users = await User.find();
            if (!users || !users.length === 0) {
                return res.notFound({ message: 'Không tìm thấy người dùng!' });
            }
            return res.ok({ err: 0, data: [users], message: 'Danh sách người dùng!'});
        } catch (error) {
            return res.serverError({ error: 1, data: null, message: error.message });
        }
    },

    destroy: async (req, res) => {
        const id = req.param('id');
        if (!id) return res.badRequest({ error: 'Thiếu ID người dùng.' });
        try {
            const user = await User.destroyOne({ id });
            return user ? res.ok({ message: 'Đã xoá thành công', user }) : res.notFound({ error: 'Không tìm thấy người dùng.' });
        } catch (err) {
            return res.serverError({ error: err.message });
        }
    }
}