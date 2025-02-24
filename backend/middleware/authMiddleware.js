const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token) return res.status(401).json({ error: "Access denied" });

//     try {
//         const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(400).json({ error: "Invalid token" });
//     }

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid Token" });
    }
};

const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }
    next();
};

module.exports = { authenticate, authorizeRole };



