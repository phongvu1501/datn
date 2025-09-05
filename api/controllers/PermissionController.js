
module.exports = {
    create: async function (req, res) {
        const { name } = req.body;

        if (!name || typeof name !== 'string') {
            return res.badRequest({ message: 'Tên quyền không hợp lệ.' });
        }

        const existed = await Permission.findOne({ name });
        if (existed) {
            return res.badRequest({ message: 'Quyền đã tồn tại.' });
        }

        const newPermission = await Permission.create({ name }).fetch();
        return res.ok({ message: 'Tạo quyền thành công', data: newPermission });
    },

    list: async function (req, res) {
        const permissions = await Permission.find().sort('name ASC');
        return res.ok({ data: permissions });
    },

    delete: async function (req, res) {
        const id = req.params.id;
        const deleted = await Permission.destroyOne({ id });
        if (!deleted) {
            return res.notFound({ message: 'Không tìm thấy quyền.' });
        }

        return res.ok({ message: 'Xóa quyền thành công' });
    },
    assignPermissions: async function (req, res) {
        try {
            const { permissions } = req.body;
            const userId = req.params.id;
            if (!permissions || !Array.isArray(permissions) || permissions.length === 0) {
                return res.badRequest({ message: 'Danh sách quyền không hợp lệ.' });
            }
            sails.log('Gán quyền cho user:', userId);
            sails.log('Permissions:', permissions);
            const allString = permissions.every(p => typeof p === 'string');
            if (!allString) {
                return res.badRequest({ errCode: 4, message: 'Tất cả permission phải là chuỗi.' });
            }
            const user = await User.findOne({ id: userId }).populate('roles');
            if (!user) return res.notFound({ errCode: 5, message: 'Không tìm thấy người dùng.' });
            const roleName = `custom_role_for_${user.username}`;
            let role = await Role.findOne({ name: roleName });
            if (!role) {
                role = await Role.create({ name: roleName })
            }
            const allPerms = await Permission.find({ name: permissions });
            if (allPerms.length !== permissions.length) {
                return res.badRequest({ errCode: 3, message: 'Một số quyền không tồn tại trong hệ thống.' });
            }
            const hasRole = user.roles.some(r => r.name === roleName);
            if (!hasRole) {
                const result = await User.addToCollection(user.id, 'roles').members([role.id]);
                if (!result) {
                    return res.serverError({ errCode: 1, data: result, message: 'Không thể gán quyền cho người dùng.' });
                }
            }
            return res.ok({ errCode: 0, message: 'Phân quyền thành công!', assignedPermissions: permissions });
        } catch (err) {
            sails.log.error('Lỗi assignPermissions:', err);
            return res.serverError({ errCode: 2, message: 'Có lỗi xảy ra trong quá trình phân quyền.' });
        }
    },

    getListPermission: async function (req, res) {
        const permission = await Permission.find();
        if (!permission || permission.length === 0) {
            return res.notFound({ errCode: 1, message: 'Không tìm thấy quyền.' });
        }
        return res.ok({ errCode: 0, data: permission, message: 'Lấy danh sách quyền thành công.' });
    },
    createPermission: async function (req, res) {
        const { name, ctr, action, description } = req.body;
        if (!name || !ctr || !action || !description) {
            return res.badRequest({ errCode: 1, message: 'Thiếu thông tin cần thiết.' });
        }
        const existingPermission = await Permission.create({ name, ctr, action, description });
        return res.ok({ errCode: 0, data: existingPermission, message: 'Tạo quyền thành công.' });
    }
};