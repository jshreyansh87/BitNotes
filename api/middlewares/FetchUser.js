const jwt = require('jsonwebtoken');

const FetchUser = (req, res, next) => {
    try {
        const token = req.header(process.env.AUTH_TOKEN_HEADER);
        if(!token){
            return res.status(401).json({error: "Unauthorized"});
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({error: "Unauthorized"});
    }
}

module.exports = FetchUser;