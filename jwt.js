const {sign, verify} = require('jsonwebtoken')

const createToken = (user) => {
    const accessToken = sign({username:user.username,id:user.id},"6wqaifzpij7dhuzd")
    return accessToken;
}
const verifyToken = (req, res, next) => {
    const accessToken = req.cookies ? req.cookies['token'] : null;
    //da li postoji
    if (!accessToken) {
        return res.status(400).json({ error: "User not authenticated!" });
    }
    //da li je validan
    try {
        const validToken = verify(accessToken, "6wqaifzpij7dhuzd");
        if (validToken) {
            req.auth = true;
            return next();
        }
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}


module.exports = {
    createToken,
    verifyToken
}
