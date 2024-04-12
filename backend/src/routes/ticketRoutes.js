const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticketController');

router.get('/api/tickets', ticketController.getAllTickets);
router.post('/api/tickets', ticketController.createTicket);
router.put('/api/tickets/:id', ticketController.updateTicketStatus);
router.delete('/api/tickets/:id', ticketController.deleteTicket);

module.exports = router;
