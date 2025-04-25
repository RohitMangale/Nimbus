
module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role_id !== requiredRole) {
            return res.status(403).json({ error: "Access denied role" });
        }
        next();
    };
};