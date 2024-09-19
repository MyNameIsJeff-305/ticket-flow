const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const ticketsRouter = require('./tickets.js');
const partsRouter = require('./parts.js');
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tickets', ticketsRouter);
router.use('/parts', partsRouter);

router.get('/require-auth', requireAuth, (req, res) => {
    try {
        return res.json(req.user);
    } catch (error) {
        next({
            message: 'Error in /require-auth'
        })
    }
});
// router.post('/test', (req, res) => {
//     res.json({ requestBody: req.body });
// });

module.exports = router;