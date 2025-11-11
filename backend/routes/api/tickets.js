const express = require('express');

const { StockMovement, Ticket, TicketPart, Status, Client, User, Part, Note, TicketEmployee, TwilioCall, TwilioRecording, Location, locationEmail, LocationPhoneNumber } = require('@db/models');

const generateAlphanumericId = require('@utils/randomGenerator');

const { requireAuth } = require('@utils/auth');
const { properUserValidation, properNoteValidation } = require('@utils/validation');

const router = express.Router();

const { Op, fn, col, where: sqWhere } = require('sequelize');

// Get all Tickets
router.get('/', requireAuth, async (req, res, next) => {
    try {

        const { status, client, createdBy } = req.query;

        const { statusList, search } = req.query;

        const page = parseInt(req.query.page) || null;
        const size = parseInt(req.query.size) || null;
        const today = req.query.today ? req.query.today === 'true' : undefined;
        const sortLabel = req.query.sort || 'createdAt';
        const sortValue = req.query.value || 'ASC';

        const where = {};

        if (status) {
            where.status = parseInt(status);
        }

        if (client) {
            where.clientId = parseInt(client);
        }

        if (createdBy) {
            where.createdBy = parseInt(createdBy);
        }

        if (today) {
            const now = new Date();
            where.createdAt = {
                [Op.gte]: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                [Op.lt]: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
            };
        }

        if (statusList) {
            const statusArray = statusList.split(',').map(s => parseInt(s));
            where.statusId = {
                [Op.in]: statusArray
            };
        }

        if (search) {
            where[Op.or] = [
                // Búsqueda case-insensitive usando Sequelize.where y fn('LOWER', ...)
                sqWhere(fn('LOWER', col('title')), {
                    [Op.like]: `%${search.toLowerCase()}%`
                }),
                sqWhere(fn('LOWER', col('description')), {
                    [Op.like]: `%${search.toLowerCase()}%`
                })
            ];
        }

        const tickets = await Ticket.findAll({
            where,
            limit: size,
            offset: (page - 1) * size,
            order: [[sortLabel, sortValue]],
            //Include associated TicketEmployees and the user data of every userId assigned to the ticket
            include: [
                {
                    model: TicketEmployee,
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'ticketId'] },
                    include: [
                        {
                            model: User,
                            attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt', 'isActive', 'departmentId'] }
                        }
                    ]
                }
            ]
        });

        let Tickets = [];

        for (const ticket of tickets) {
            ticket["status"] = await Status.findByPk(where.status);
            ticket.clientId = await Client.findByPk(where.client || ticket.clientId, { attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'email', 'phoneNumber', 'address'] } });
            ticket.createdBy = await User.findByPk(where.createdBy || ticket.createdBy, { attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt', 'isActive', 'departmentId'] } });
            ticket.calls = await TwilioCall.findAll({ where: { ticketId: ticket.id } });

            const values = ticket.toJSON();

            Tickets.push(values);
        }

        return res.json(Tickets);

    } catch (error) {
        next(error);
    }
});

// Track a Ticket by hashed ID
router.get('/track/:hashedId', async (req, res) => {
    const { hashedId } = req.params;

    // Retrieve ticket by original ticket ID (stored with the hash)
    const ticket = await Ticket.findOne({ where: { hashedId } });

    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
    }

    const CreatedBy = await User.findByPk(ticket.createdBy);

    const ClientInfo = await Client.findByPk(ticket.clientId);

    const StatusInfo = await Status.findByPk(ticket.statusId);

    const safeTicket = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        checkIn: ticket.checkIn,
        checkOut: ticket.checkOut,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        CreatedBy,
        ClientInfo,
        // Parts,
        StatusInfo
    }

    // If valid, send ticket data for tracking
    res.json(safeTicket);
});

// Add an Assignee to a Ticket
router.post('/:id/assignees', requireAuth, async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Find the ticket
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Check if the user is already assigned
        const existingAssignment = await TicketEmployee.findOne({
            where: {
                ticketId: ticket.id,
                userId
            }
        });

        if (existingAssignment) {
            return res.status(400).json({ message: 'User is already assigned to this ticket' });
        }

        // Assign the user to the ticket
        await TicketEmployee.create({
            ticketId: ticket.id,
            userId
        });

        res.status(201).json({
            message: 'User assigned successfully',
            ticketId: ticket.id,
            userId: userId
        });
    } catch (error) {
        next(error);
    }
});

//Remove an assignee from a Ticket
router.delete('/:id/assignees/:userId', requireAuth, async (req, res, next) => {
    try {
        const { id, userId } = req.params;

        const ticket = await Ticket.findByPk(id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        const assignment = await TicketEmployee.findOne({
            where: { ticketId: id, userId }
        });
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        await assignment.destroy();

        // ✅ Return info for Redux to update state
        res.json({ message: 'User unassigned successfully', ticketId: parseInt(id), userId: parseInt(userId) });
    } catch (error) {
        next(error);
    }
});

// Get Tickets created by Current User
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const tickets = await Ticket.findAll({
            where: {
                createdBy: req.user.id
            }
        });

        let Tickets = [];

        for (const ticket of tickets) {
            ticket.clientId = await Client.findByPk(ticket.clientId);
            ticket.createdBy = await User.findByPk(ticket.createdBy, { attributes: { exclude: ['id', 'username', 'email', 'hashedPassword', 'createdAt', 'updatedAt', 'isActive', 'departmentId'] } });

            const values = ticket.toJSON();

            Tickets.push(values);
        }

        return res.json(Tickets);

    } catch (error) {
        next(error);
    }
});

// Get Ticket by ID
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const CreatedBy = await User.findByPk(ticket.createdBy, { attributes: { exclude: ['id', 'username', 'email', 'hashedPassword', 'createdAt', 'updatedAt', 'isActive', 'departmentId'] } });

        const ClientInfo = await Client.findByPk(ticket.clientId, { attributes: { exclude: ['createdAt', 'updatedAt', 'email', 'phoneNumber', 'address'] } });

        const Locations = await Location.findAll({
            where: {
                clientId: ClientInfo.id
            }
        });

        for (const location of Locations) {
            const emails = await locationEmail.findAll({
                where: {
                    locationId: location.id
                }
            });

            const phoneNumbers = await LocationPhoneNumber.findAll({
                where: {
                    locationId: location.id
                }
            });

            location.dataValues.Emails = emails;
            location.dataValues.PhoneNumbers = phoneNumbers;
        }

        ClientInfo.dataValues.Locations = Locations;

        const ticketParts = await TicketPart.findAll({
            where: { ticketId: ticket.id }
        });

        const Parts = [];

        for (const part of ticketParts) {
            const partInfo = await Part.findByPk(part.partId);
            Parts.push(partInfo);
        }

        let Notes = await Note.findAll({

        })

        const StatusInfo = await Status.findByPk(ticket.statusId);

        const AssignedEmployeesData = await TicketEmployee.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        const AssignedEmployees = [];

        for (const employee of AssignedEmployeesData) {
            const user = await User.findByPk(employee.userId);
            AssignedEmployees.push({
                id: user.id,
                name: user.username,
                profilePicURL: user.profilePicUrl
            });
        }

        const CallInfo = await TwilioCall.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        const Recordings = await TwilioRecording.findAll({
            where: {
                callId: CallInfo[0]?.id || null
            }
        });

        const safeTicket = {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            checkIn: ticket.checkIn,
            checkOut: ticket.checkOut,
            hashedId: ticket.hashedId,
            AssignedEmployees,
            CreatedBy,
            ClientInfo,
            Parts,
            Notes,
            StatusInfo,
            CallInfo,
            Recordings
        }

        return res.json(safeTicket);

    } catch (error) {
        next(error);
    }
});

// Create a Ticket
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { title, description, clientId } = req.body;

        const ticket = await Ticket.create({
            title,
            description,
            checkIn: null,
            checkOut: null,
            clientId,
            statusId: 1,
            hashedId: generateAlphanumericId(10),
            createdBy: req.user.id
        });

        return res.json(ticket);

    } catch (error) {
        next(error);
    }
});

// Update a Ticket
router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByPk(parseInt(id));
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { title, description, checkIn, checkOut, statusId, clientId } = req.body;

        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.checkIn = checkIn || ticket.checkIn;
        ticket.checkOut = checkOut || ticket.checkOut;
        ticket.statusId = statusId || ticket.statusId;
        ticket.clientId = clientId || ticket.clientId;

        await ticket.save();

        return res.json(ticket);

    } catch (error) {
        next(error);
    }
});

//Get All Parts by a Ticket's Id
router.get('/:id/parts', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const parts = await Part.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        return res.json({
            Parts: parts
        });

    } catch (error) {
        next(error);
    }
});

// Add a Part to a Ticket based on the Ticket's Id
router.post('/:ticketId/parts', requireAuth, properUserValidation, async (req, res, next) => {
    const { ticketId } = req.params;
    const { partId, quantity = 1, unitPrice, notes, inventoryLocationId } = req.body;

    try {
        const ticketPart = await TicketPart.create({
            ticketId,
            partId,
            quantity,
            unitPrice,
            inventoryLocationId,
            notes,
            status: 'REQUESTED'
        });

        await StockMovement.create({
            partId,
            inventoryLocationId,
            quantity: -quantity,
            type: 'out',
            sourceType: 'Ticket Part Request',
            sourceId: ticketPart.id,
            employeeId: req.user.id
        });

        return res.status(201).json(ticketPart);
    } catch (error) {
        next(error);
    }
});

// Update a Part as "Picked Up" and substract from stock
router.put('/:ticketId/parts/:ticketPartId/pickup', requireAuth, properUserValidation, async (req, res, next) => {
    const { ticketId, ticketPartId } = req.params;

    try {
        const ticketPart = await TicketPart.findOne({
            where: {
                id: ticketPartId,
                ticketId: ticketId
            }
        });

        if (!ticketPart) {
            return res.status(404).json({ message: 'Ticket Part not found' });
        }

        ticketPart.status = 'PICKED_UP';
        await ticketPart.save();

        return res.json(ticketPart);
    } catch (error) {
        next(error);
    }
});

// Update a Part as "Installed"
router.put('/:ticketId/parts/:ticketPartId/install', requireAuth, properUserValidation, async (req, res, next) => {
    const { ticketId, ticketPartId } = req.params;

    try {
        const ticketPart = await TicketPart.findOne({
            where: {
                id: ticketPartId,
                ticketId: ticketId
            }
        });

        if (!ticketPart) {
            return res.status(404).json({ message: 'Ticket Part not found' });
        }

        ticketPart.status = 'INSTALLED';
        await ticketPart.save();

        return res.json(ticketPart);
    } catch (error) {
        next(error);
    }
});

// Update a Part as "Returned" and add back to stock
router.put('/:ticketId/parts/:ticketPartId/return', requireAuth, properUserValidation, async (req, res, next) => {
    const { ticketId, ticketPartId } = req.params;

    try {
        const ticketPart = await TicketPart.findOne({
            where: {
                id: ticketPartId,
                ticketId: ticketId
            }
        });

        if (!ticketPart) {
            return res.status(404).json({ message: 'Ticket Part not found' });
        }

        ticketPart.status = 'RETURNED';
        await ticketPart.save();

        await StockMovement.create({
            partId: ticketPart.partId,
            inventoryLocationId: ticketPart.inventoryLocationId,
            quantity: ticketPart.quantity,
            type: 'in',
            sourceType: 'Ticket Part Return',
            sourceId: ticketPart.id,
            employeeId: req.user.id
        });

        return res.json(ticketPart);
    } catch (error) {
        next(error);
    }
});

//Get All the notes for a Ticket based on Ticket's Id
router.get('/:id/notes', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const notes = await Note.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        return res.json({
            Notes: notes
        });

    } catch (error) {
        next(error);
    }
});

//Add a Note to a Ticket based on the Ticket's Id
router.post('/:id/notes', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { note } = req.body;

        const createdNote = await Note.create({
            note,
            userId: (parseInt(req.user.id)),
            ticketId: ticket.id
        });

        return res.json(createdNote);

    } catch (error) {
        next(error);
    }
});

//Delete a Note of a Ticket based on the ticket Id
router.delete('/:id/notes/:noteId', requireAuth, properNoteValidation, async (req, res, next) => {
    try {
        const { id, noteId } = req.params;

        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const note = await Note.findByPk(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await note.destroy();

        return res.json({ message: 'Note removed from ticket' });
    } catch (error) {
        next(error);
    }
});

//Delete a Ticket by Id
router.delete('/:id', requireAuth, properUserValidation, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        await ticket.destroy();

        return res.json({ "message": "Successfully Deleted" });

    } catch (error) {
        next(error);
    }
});

//Get the Status of a Ticket based on the Ticket's Id
router.get('/:id/status', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const status = await Status.findByPk(ticket.statusId);

        return res.json(status);

    } catch (error) {
        next(error);
    }
});

// Assign an Employee to the Ticket
router.post('/:ticketId/assign', requireAuth, properUserValidation, async (req, res, next) => {
    try {
        const { ticketId } = req.params;

        const ticket = await Ticket.findByPk(parseInt(ticketId));

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { userId } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const assignment = await TicketEmployee.create({
            ticketId: ticket.id,
            userId: user.id
        });

        return res.json(assignment);

    } catch (error) {
        next(error);
    }
});

// Unassign an Employee to the Ticket
router.delete('/:id/assign/:userId', requireAuth, properUserValidation, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const assignment = await TicketEmployee.findOne({
            where: {
                ticketId: ticket.id,
                userId: user.id
            }
        });

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        await assignment.destroy();

        return res.json({ message: 'Employee unassigned from ticket' });

    } catch (error) {
        next(error);
    }
});

//Add a Signature to a Ticket
router.post('/:id/signature', requireAuth, properUserValidation, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { signature } = req.body;

        ticket.signature = signature;
        await ticket.save();

        return res.json(ticket);

    } catch (error) {
        next(error);
    }
});

module.exports = router;