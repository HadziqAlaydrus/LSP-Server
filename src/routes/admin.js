const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // Koneksi ke database PostgreSQL


// Tambah menu appetizer
router.post('/add-appetizer', async (req, res) => {
    const { nama_makanan, harga_makanan, stock_makanan, image } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO appetizer (nama_makanan, harga_makanan, stock_makanan, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [nama_makanan, harga_makanan, stock_makanan, image]
        );
        res.status(201).json({ message: 'Appetizer added successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add appetizer' });
    }
});


// Update stock appetizer
// Update appetizer dengan image
router.put('/update-appetizer/:id', async (req, res) => {
    const { id } = req.params;
    const { nama_makanan, harga_makanan, stock_makanan, image } = req.body; // Destructure the new fields
    
    try {
        const result = await pool.query(
            `UPDATE appetizer 
             SET nama_makanan = $1, harga_makanan = $2, stock_makanan = $3, image = $4 
             WHERE id = $5 RETURNING *`,
            [nama_makanan, harga_makanan, stock_makanan, image, id] // Include the new fields in the query
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Appetizer not found' });
        }

        res.json({ message: 'Appetizer updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update appetizer' });
    }
});


// Delete appetizer
router.delete('/delete-appetizer/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query(
            'DELETE FROM appetizer WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Appetizer not found' });
        }
        res.json({ message: 'Appetizer deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete appetizer' });
    }
});

// Tambah menu makanan utama
router.post('/add-makanan', async (req, res) => {
    const { nama_makanan, harga_makanan, stock_makanan, image } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO makanan_utama (nama_makanan, harga_makanan, stock_makanan, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [nama_makanan, harga_makanan, stock_makanan, image]
        );
        res.status(201).json({ message: 'Makanan added successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add makanan' });
    }
});

// Update stock makanan
// Update makanan dengan image
router.put('/update-makanan/:id', async (req, res) => {
    const { id } = req.params;
    const { nama_makanan, harga_makanan, stock_makanan, image } = req.body; // Destructure the new fields

    try {
        const result = await pool.query(
            `UPDATE makanan_utama 
             SET nama_makanan = $1, harga_makanan = $2, stock_makanan = $3, image = $4 
             WHERE id = $5 RETURNING *`,
            [nama_makanan, harga_makanan, stock_makanan, image, id] // Include the new fields in the query
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Makanan not found' });
        }

        res.json({ message: 'Makanan updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update makanan' });
    }
});

// Delete makanan
router.delete('/delete-makanan/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM makanan_utama WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Makanan not found' });
        }
        res.json({ message: 'Makanan deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete makanan' });
    }
});

// Tambah menu minuman
router.post('/add-minuman', async (req, res) => {
    const { nama_minuman, harga_minuman, stock_minuman, image } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO minuman (nama_minuman, harga_minuman, stock_minuman, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [nama_minuman, harga_minuman, stock_minuman, image]
        );
        res.status(201).json({ message: 'Minuman added successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add minuman' });
    }
});

// Update stock minuman
// Update minuman dengan image
router.put('/update-minuman/:id', async (req, res) => {
    const { id } = req.params;
    const { nama_minuman, harga_minuman, stock_minuman, image } = req.body; // Destructure the new fields

    try {
        const result = await pool.query(
            `UPDATE minuman 
             SET nama_minuman = $1, harga_minuman = $2, stock_minuman = $3, image = $4 
             WHERE id = $5 RETURNING *`,
            [nama_minuman, harga_minuman, stock_minuman, image, id] // Include the new fields in the query
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Minuman not found' });
        }

        res.json({ message: 'Minuman updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update minuman' });
    }
});

// Delete minuman
router.delete('/delete-minuman/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM minuman WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Minuman not found' });
        }
        res.json({ message: 'Minuman deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete minuman' });
    }
});

module.exports = router;
