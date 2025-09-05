module.exports = async function (req, res, next) {
    try {

        if (req.options.action) {
            let data = req.options.action.split('/');
            // req.options.controller = data.length == 2 ? data[0] : data[0] + '/' + data[1];
            req.options.action = data.length == 2 ? data[1] : data[0];
        }
        await checkRole(req.options.controller, req.options.action, req.user);
        return next();
    } catch (error) {
        return res.serverError({ message: error.message });
    }
}
async function checkRole(ctr, action, user) {

    const userRoles = user.roles || [];
    if (!userRoles.length) {
        throw new Error('User does not have any roles assigned.');
    }
    const role = await UserRole.findOne({ id: userRoles });
    if (!role || !role.permissions?.length) {
        throw new Error('Role not found for the user.');
    }
    const permissions = await Permission.find({ ctr: String(ctr).toLowerCase(), action: action });

    if (!permissions?.length) {
        throw new Error('No permissions found for the specified controller and action.');
    }
    const prAccess = permissions[0]
    const hasPermission = role.permissions.some(pr => pr == prAccess.id)
    if (!hasPermission) {
        throw new Error('User does not have permission to access this resource.');
    }
    return true


}