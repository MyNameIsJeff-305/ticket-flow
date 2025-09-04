const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const ticketsRouter = require('./tickets.js');
const partsRouter = require('./parts.js');
const notesRouter = require('./notes.js');
const statusesRouter = require('./statuses.js');
const clientsRouter = require('./clients.js');
const departmentsRouter = require('./departments.js');
const rolesRouter = require('./roles.js');
const permissionsRouter = require('./permission.js');
const locationsRouter = require('./locations.js');
const assessmentsRouter = require('./assessments.js')

const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");

router.use(restoreUser);

//Fixed Sorting of Router
router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/departments', departmentsRouter);
router.use('/roles', rolesRouter);
router.use('/permissions', permissionsRouter);
router.use('/clients', clientsRouter);
router.use('/status', statusesRouter);
router.use('/locations', locationsRouter);
router.use('/tickets', ticketsRouter);
router.use('/parts', partsRouter);
router.use('/notes', notesRouter);
router.use('/assessments', assessmentsRouter);

router.get('/require-auth', requireAuth, (req, res) => {
    try {
        return res.json(req.user);
    } catch (error) {
        next({
            message: 'Error in /require-auth'
        })
    }
});

module.exports = router;