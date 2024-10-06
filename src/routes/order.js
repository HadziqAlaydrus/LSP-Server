const express = require('express');
const pool = require('../db/db');
const router = express.Router();

// Create a new order
router.post('/order', async (req, res) => {
    const { konfirmasi_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "order" (konfirmasi_id) VALUES ($1) RETURNING *',
            [konfirmasi_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Create a new konfirmasi
router.post('/konfirmasi', async (req, res) => {
    const { nomor_meja, nama } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO konfirmasi (nomor_meja, nama) VALUES ($1, $2) RETURNING *',
            [nomor_meja, nama]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create konfirmasi' });
    }
});


module.exports = router;
