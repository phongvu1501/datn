module.exports = {
  async check(userId, permissionName) {
    const user = await User.findOne({ id: userId })

    if (!user || !user.roles.length) return false;

    // Populate permissions của từng role
    const rolesWithPermissions = await Promise.all(
      user.roles.map(async role => {
        return await Role.findOne({ id: role.id })
      })
    );

    for (const role of rolesWithPermissions) {
      if (role.permissions.some(p => p.name === permissionName)) {
        return true;
      }
    }

    return false;
  }
};
