export const authorizeOwnership = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = parseInt(req.params.userId, 10);

    const paramId = parseInt(req.params.userId, 10);

    if (userId !== paramId && req.user.role !== 'MANAGER') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
};