const jwt = require("jsonwebtoken"); //JWT tokens creation (sign())

const config = require("../config/db.config.js");
const db = require("../models/index");
const Utilizador = db.utilizadores;

exports.verifyToken = (req, res, next) => {
    // search token in headers most commonly used for authorization
    const header = req.headers['x-access-token'] || req.headers.authorization;
    if (typeof header == 'undefined') {
        return res.status(401).json({ success: false, msg: "No token provided!" });
    }
    const bearer = header.split(' '); // Authorization: Bearer <token>
    const token = bearer[1];

    try {

        let decoded = jwt.verify(token, config.SECRET);
        req.UtilizadorAutenticadoID = decoded.id; // save user ID and role into request object
        req.UtilizadorAutenticadoRole = decoded.tipo;
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, msg: "Ops, seu token expirou! Por favor faça login novamente." });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, msg: "JWT malformado" });
        }
        return res.status(401).json({ success: false, msg: "Não autorizado!" });
    }
};
