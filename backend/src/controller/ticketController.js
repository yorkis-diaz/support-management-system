const { ObjectId } = require('mongodb')
const client = require('../db');

exports.createTicket = async (req, res) => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('support-management-api');
        const collection = database.collection('support-tickets'); // Get the tickets collection

        const { name, email, description, status = 'New' } = req.body;

        const result = await collection.insertOne({
            name,
            email,
            description,
            status
        });


        const newTicketId = result.insertedId;

        const newTicket = await collection.findOne({ _id: newTicketId });

        const { _id, ...ticketWithoutId } = newTicket;
        const ticketWithId = { id: _id, ...ticketWithoutId };


        res.json(ticketWithId);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        console.log('are we here?', client)
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('support-management-api');
        const collection = database.collection('support-tickets'); // Get the tickets collection

        const tickets = await collection.find({}).toArray();
        const ticketsWithId = tickets.map(ticket => {
            const { _id, ...ticketWithoutId } = ticket;
            return { id: _id, ...ticketWithoutId };
        });

        res.json(ticketsWithId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
};

exports.updateTicketStatus = async (req, res) => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('support-management-api');
        const collection = database.collection('support-tickets'); // Get the tickets collection

        const ticketId = req.params.id;
        const { status } = req.body;

        const objectId = ObjectId.createFromHexString(ticketId);
        const result = await collection.updateOne(
            { _id: objectId },
            { $set: { status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket status updated successfully' });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('support-management-api');
        const collection = database.collection('support-tickets'); // Get the tickets collection

        const ticketId = req.params.id;

        const objectId = ObjectId.createFromHexString(ticketId);
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket deleted successfully' });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
};
