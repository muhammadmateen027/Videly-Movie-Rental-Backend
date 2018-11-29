const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try{
        // below line decode the token through config key
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayLoad;

        //give permission to enter in api and can get access
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}
