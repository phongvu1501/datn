module.exports = async function (req, res, next) {
    console.log('Policy:Verifying device...');
    console.log({ qr: req.query });
    console.log({ body: req.body });
    return next();
}