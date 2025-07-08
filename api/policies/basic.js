module.exports = async function (req, res, next) {
    // const token = req.headers['authorization'];
    // if (!token) {
    //     return res.status(401).json({ errCode: 401, errMsg: 'Unauthorized' });
    // }
    // if (['hocsinh', 'giaovien'].includes(token)) {
    //     if (!req.info) req.info = {};
    //     req.info.client = token;
    //     return next();
    // }
    // return res.status(200).json({ errCode: 401, errMsg: 'Unauthorized' });

    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).json({ errCode: 401, errMsg: 'Unauthorized' });
    }
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Basic') {
        return res.status(401).json({ errCode: 401, errMsg: 'Unauthorized' });
    }
    const tokenBasic = parts[1];
    const client = await Client.findOne({
        where: { tokenBasic }
    });
    if (!client) {
        return res.status(401).json({ errCode: 401, errMsg: 'Unauthorized' });
    }
    if (!req.info) req.info = {};
    req.info.client = client;
    return next();
}