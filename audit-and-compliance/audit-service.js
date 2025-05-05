const express = require('express');
const bodyParser = require('body-parser');
const { AuditLogs } = require('./models');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(bodyParser.json());

// Create a new audit
app.post('/audit', async (req, res) => {
    try {
        const add_audit = await AuditLogs.create(req.body);
        res.status(201).json(add_audit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all audit
app.get('/audit', async (req, res) => {
    try {
        const audits = await AuditLogs.findAll();
        res.json(audits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a user by ID
app.get('/audit/:id', async (req, res) => {
    try {
        const audit = await AuditLogs.findByPk(req.params.id);
        if (!audit) {
            return res.status(404).json({ error: 'Audit log not found' });
        }
        res.json(audit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID
app.put('/audit/:id', async (req, res) => {
    try {
        const audit = await AuditLogs.findByPk(req.params.id);
        if (!audit) {
            return res.status(404).json({ error: 'Audit log not found' });
        }
        await audit.update(req.body);
        res.json(audit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user by ID
app.delete('/audit/:id', async (req, res) => {
    try {
        const audit = await AuditLogs.findByPk(req.params.id);
        if (!audit) {
            return res.status(404).json({ error: 'Audit log not found' });
        }
        await audit.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Audit service running on http://localhost:${PORT}`);
});